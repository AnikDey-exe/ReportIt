import Realm from "realm";
import { reportSchema } from "../schemas/Report";
import { userSchema } from "../schemas/User";

export const getReportDetails = async(id, email) =>{
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
    console.log(email)
    var data = realm.objects("Reports");
    var userProf = realm.objects("Users");

    var details = data.filtered(`report_id='${id}'`)[0];
    console.log(details)

    var userP = userProf.filtered(`email='${email}'`)[0];
    console.log(userP)

    setTimeout(() => {
        user.logOut()
    }, 2000)

    return [details, userP.type, false]
}