import Realm from 'realm';
import { reportSchema } from '../schemas/Report';

export const deleteReport = async(id, accountType, email, sorter) => {
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
    var docToDelete = data.filtered(`report_id='${id}'`)

    realm.write(() => {
        // Delete the task from the realm.
        realm.delete(docToDelete);

        docToDelete = null;
    });

    var newData = realm.objects("Reports");
    var userData = data.filtered(`${accountType}='${email}'`);
    
    if(sorter === 'A-to-Z') {
        var sortedData = userData.sorted('name', false);
    } else {
        var sortedData = userData.sorted('name', true);
    }

    setTimeout(() => {
        user.logOut()
    }, 2000)

    return sortedData
}