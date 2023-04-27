import Realm from 'realm';
import { userSchema } from '../schemas/User';

export const getUserDetails = async(email) => {
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
            schema: [userSchema],
            sync: {
                user: user,
                flexible: true
            },
        });

        await realm.subscriptions.update((subs) => {
            const users = realm
                .objects("Users")
            subs.add(users);
        });
        
    } catch (err) {
        console.error("Failed to log in", err);
    }

    var data = realm.objects("Users");

    const findUser = await data.filtered(`email='${email}'`)[0]

    setTimeout(() => {
        user.logOut()
    }, 2000)
    console.log('s',findUser)
    return findUser
}