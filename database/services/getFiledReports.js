import Realm from 'realm';
import { reportSchema } from '../schemas/Report';

export const getFiledReports = async(email) => {
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
            schema: [reportSchema],
            sync: {
                user: user,
                flexible: true
            },
        });

        await realm.subscriptions.update((subs) => {
            const reports = realm
                .objects("Reports")
            subs.add(reports);
        });
        console.log("subscribed")
    } catch (err) {
        console.error("Failed to log in", err);
    }

    var data = realm.objects("Reports");

    var userData = data.filtered(`filer='${email}'`);
    
    var sortedData = userData.sorted('name', false);

    setTimeout(() => {
        user.logOut()
    }, 2000)

    return sortedData
}