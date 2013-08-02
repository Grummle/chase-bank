var q = require('q');
var request = require('request');
var config = require('./config');
var _ = require('underscore');

var cookieJar = request.jar();
request = request.defaults({jar:cookieJar});

var login = function(username, password, deviceSignature){
        var deferred = q.defer();

        cookieJar.add(request.cookie('emb.deviceSig=' + deviceSignature));
        cookieJar.add(request.cookie('emb.tempUserId='+ username));

        var formDeviceSignature= {
            navigator:{},
            plugins:[{
            name:"MOBID",
            version:deviceSignature
            }],
            screen:{},
            extra:{}
        };

        var loginFormData = {
            'userid':username,
            'login-slider': 'off',
            'logon-password': password,
            'auth_passwd': password,
            'auth_siteId': 'MOE',
            'auth_contextId': 'login',
            'auth_deviceSignature': JSON.stringify(formDeviceSignature),
            'auth_userId': username
        }

        var loginRequestOptions = {
            url: config.loginUrl,
            headers: config.headers,
            method:'POST',
            form: loginFormData,
        };
        
        request(loginRequestOptions, function(err,res,body){
            if(err) deferred.reject(err); 
      
            console.log('Login------------------------');
            console.log(res.statusCode);
            console.log(res.headers);
            console.log('-----request----');
            console.log(res);

            getProfile().then(function(profile){
                deferred.resolve(profile);
            }); 
        });
        

        return deferred.promise;
    };


var getProfile = function(){
    var deferred = q.defer();

    var profileForm = {
        type:'json',
        version: 1,
        cache: true,
        appId: 'GATEWAY',
        channelId: 'MOE'
    };

    var profileRequestOptions = {
        url: config.profileUrl, 
        headers: config.headers,
        method:'POST',
        form: profileForm,
    };

    var pullAccount = function(account){
        var type = '';
        switch(account.type){
            case 'ATM': type = 'atm_card'; break;
            case 'BAC': type = 'credit_card'; break;
            case 'CHK': type = 'checking'; break;
            case 'MMA': type = 'savings'; break;
        }
        return acct = {
            name: account.displayName,
            id: account.id,
            type: type,
            balance:{
                available: account.details ? account.details.values.available : 0,
                current: account.details ? account.details.values.current: 0,
            }
        };
    };

    request(profileRequestOptions, function(err,res,body){
        if(err) deferred.reject(err);
            console.log('profile------------------------');
            console.log(res.statusCode);
            console.log(res.headers);

        var parsedProfile = JSON.parse(body).profile.miniProfileGroups.personalCustomers[0];

        var profile = {
            id: parsedProfile.id,
            name: parsedProfile.name,
            accounts: _(parsedProfile.accounts).map(pullAccount)

        };

        deferred.resolve(profile);
    });

    return deferred.promise;
}




exports.login = login;
