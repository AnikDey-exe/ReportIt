import Realm from 'realm';
import auth from '@react-native-firebase/auth';
import { createId } from '../../../utils/createId';
import { userSchema } from '../../schemas/User';
 
export default async function registerAccount(firstName, lastName, email, password, accountType) {
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

    await auth().createUserWithEmailAndPassword(email, password)
    .then(()=>{
        let item1;
        var id = createId();
        realm.write(() => {
            item1 = realm.create('Users', {
              _id: id,
              first_name: firstName,
              last_name: lastName,
              email: email,
              password: password,
              type: accountType
            });
            console.log('Added data.')
          });
        
          var data = realm.objects("Users");
          console.log('Data', data);
          alert("Successfully registered.")
    })
    .catch((error)=>{
        alert(error)
    })
    .finally(()=>{
        setTimeout(()=>{
            user.logOut()
        }, 2000)
    })
}