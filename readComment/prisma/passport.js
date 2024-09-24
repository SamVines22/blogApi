const JwtStrategy = require('passport-jwt').Strategy;
const  ExtractJwt = require('passport-jwt').ExtractJwt;
const prisma = require("../prisma/pool")
const passport = require('passport');
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';

const strategy = new JwtStrategy(opts, async (payload,done)=> {
    console.log("gimp");
    const user = await prisma.users.findFirst({where:{id: payload.sub}}) 
    if (err) {
        return done(err, false);
    }
    if (user) {
        return done(null, user);
    } else {
        
        return done(null, false);
        // or you could create a new account
    }

})


console.log(strategy);

passport.use(strategy);
console.log(passport);


module.exports = passport;