var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '32250892194-hpgfm9jm2d7mjkho5cuvoolaumqgo7ji.apps.googleusercontent.com'
const TOKEN_IDB = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjU3YjE5MjhmMmY2MzMyOWYyZTkyZjRmMjc4Zjk0ZWUxMDM4YzkyM2MiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzIyNTA4OTIxOTQtaHBnZm05am0yZDdtamtobzVjdXZvb2xhdW1xZ283amkuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzMjI1MDg5MjE5NC1ocGdmbTlqbTJkN21qa2hvNWN1dm9vbGF1bXFnbzdqaS5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMDY1ODc5OTE5MTM4NTIxNzA1MiIsImhkIjoicHJvZ3JhbS5jb20udHciLCJlbWFpbCI6InJpY2hhcmQubGlhb0Bwcm9ncmFtLmNvbS50dyIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoieG02OWx5RFloTTNtVFNLWHhHUFNBQSIsIm5hbWUiOiJSaWNoYXJkIExpYW8iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDQuZ29vZ2xldXNlcmNvbnRlbnQuY29tLy1BeDY4VFRrX2ZzZy9BQUFBQUFBQUFBSS9BQUFBQUFBQUFBQS9BQ0hpM3JmUjUxdm02UkR5a1RFcWlpTFktdWE0YmhDVllBL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJSaWNoYXJkIiwiZmFtaWx5X25hbWUiOiJMaWFvIiwibG9jYWxlIjoiemgtVFciLCJpYXQiOjE1NzcwNzI5NDIsImV4cCI6MTU3NzA3NjU0MiwianRpIjoiYWUwZDRhMGE4ZTZiNDcxOTkwMzhlZTJlZTRlNTM4YmRjZDg0NzFmNCJ9.eAUw4GycFRG2GHPFDTRXq_WTZo0MSuHa0UMd2gbzjcjbEGrRLYrKv6GctIp5BvuWq4xL62PkTrRcwx_nGgEp1eKx5-0aeCDSCC5SGQnfQQiHgJ54nJWsA7HKNItj1AuXMsjsjGeuC5KJ7dNBLkgYhYs-K0B0lzNydRe64NXVmHrpYZ-KOgbgPLUUlGu9EzMjx_4-lRWL_EMcQzDBbwrIJq8RBJqOx-6hikhznlhjUGyunGkXcfJinpX_Ko9dephQGUr_wRRWgh1qwRjNtL7FEJii8-c8BVGEqI6FOBvGJR7oVVTTtAQMNihO53CUkq0u3UfExpr1eYoKKGX_Gdcqbw"
router.post('/googleAuth', (req, res, next) => {
    const client = new OAuth2Client(CLIENT_ID);
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: req.body.tokenId,
            audience: [CLIENT_ID],  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        const audience = payload['aud'];
        const issuer = payload['iss'];

        if (audience == CLIENT_ID && issuer == 'accounts.google.com') {
            // 使用 jwt 建立 token ( id + richard_secret)
            const token = jwt.sign({ _id: userid }, process.env.TOKEN_SECRET, {
                expiresIn: "1h"
            });
            res.header("Authorization", token);

            res.json({
                retCode: 1,
                retMeg: "登入成功",
                retData: {
                    token
                }
            });
        } else {
            res.send('failse')
        }
        // const obj = {
        //     name: payload.name,
        //     family_name: payload.family_name,
        //     given_name: payload.given_name,
        //     picture: payload.picture,
        //     email: payload.email,
        //     email_verified: payload.email_verified,
        // }
        // console.log(obj)
        // If request specified a G Suite domain:
        //const domain = payload['hd'];
    }
    verify().catch(console.error);
})


module.exports = router;