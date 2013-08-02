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
