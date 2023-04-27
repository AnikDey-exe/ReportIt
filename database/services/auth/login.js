import Realm from 'realm';
import auth from '@react-native-firebase/auth';
import { changeStack } from '../../../navigation.service';
import { userSchema } from '../../schemas/User';

export default async function login(email, password, accountType, navigation) {
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
        console.log("subscribed")
    } catch (err) {
        console.error("Failed to log in", err);
    }

    const users = realm.objects("Users")
    const findUser = users.filtered(`email='${email}'`)

    if (findUser.length == 0) {
        alert('Sorry, this user does not exist')
    } else {
        const selectedUser = findUser[0]
        console.log(selectedUser)

        if (selectedUser.type === accountType) {
            await auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    if(accountType === 'reporter') {
                        navigation.navigate('UserHome')
                        changeStack('UserHome')
                    } else {
                        navigation.navigate('NgoHome')
                        changeStack('NgoHome')
                    }
                })
                .catch((err)=>{
                    alert(err)
                })
        } else {
            if(accountType === 'reporter') {
                alert('This user is an NGO account. Please login from the NGO section.')
            } else {
                alert('This user is an reporting account. Please login from the reporter section.')
            }
        }
    }

    setTimeout(()=>{
        user.logOut()
    }, 3000)
}