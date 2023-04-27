import Realm from "realm";
import { reportSchema } from "../schemas/Report";
import { userSchema } from "../schemas/User";

export const updateReport = async(id, email) => {
    const app = new Realm.App({
        id: "xxxx",
        timeout: 1000
    });

    const credentials = Realm.Credentials.anonymous();
    let user;
    let realm;
    try {
        user = await app.logIn(credentials);

        realm = await Realm.open({
            schema: [reportSchema, userSchema],
            sync: {
                user: user,
                flexible: true
            },
        });

        await realm.subscriptions.update((subs) => {
            const reports = realm
                .objects("Reports")
            const users = realm
                .objects("Users")
            subs.add(reports);
            subs.add(users);
        });
        console.log("subscribed")
    } catch (err) {
        console.error("Failed to log in", err);
    }

    // var data = realm.objects("Reports");
    // var userProf = realm.objects("Users");

    // var details = data.filtered(`report_id='${id}'`)[0];

    realm.write(()=> {
        const post = realm.objects("Reports").filtered(`report_id='${id}'`)[0];

        post.status = "pursued";
        post.pursuer = email;
    })
    console.log('updated')

    var data = realm.objects("Reports");
    var userProf = realm.objects("Users");

    var details = data.filtered(`report_id='${id}'`)[0];

    alert('You are now pursuing this report')

    setTimeout(() => {
        user.logOut()
    }, 2000)

    return details
}