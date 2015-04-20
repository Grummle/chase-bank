DEPRECATED: [Banking.js](http://euforic.co/banking.js/) and [Banking.cs](https://github.com/Grummle/Banking.cs) do work with chase so this isn't really needed anymore 
and trying to keep up with the changes to an internal api is a pita so I'm not planning to do it anymore. 
I'd also recommend looking at [Plaid](http://plaid.com/) if your looking to get ahold of financial data.



chase-bank
==========

Hacktastic way to get your data out of JP Morgan Chase

I've been looking for a way to get my info out of Chase 
for quite a while. I even tried paying for Direct OFX access 
@ $10 a month (WTF!). All to no avail. So I wrote this to take 
advantage of m.chase.com's use of a one page app (aka poor mans api) for iPhones.

Pull requests and critiques accepted, though the former are more poignant 
with a pull request.

**Install**  
```bash npm install chase-bank ```   

**Example:**

```node
var chase = require('chase-bank');
var _ = require('underscore');

chase.login('username','password','emb.deviceSigCookieValue').then(function(profile){
        console.log(JSON.stringify(profile,null,2));
});
```
