// authetication purpose
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertService } from 'src/app/service/alert.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';
import { Storage } from '@ionic/storage';
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  collectionName = 'login';
  profile = 'children';
  status = ""; 
  users = [];
   // File Path
   path: string;

  constructor(
    private firestore: AngularFirestore,
    private alertservice :AlertService,
    private router: Router,
    private storage: Storage,
    private http: HttpClient,
    private env: EnvService,
    private fstorage: AngularFireStorage,
    public loadingCtrl: LoadingController
  ) { }

  // register account function
  register(ic, name, email, phone) {
    var docRef = this.firestore.collection(this.collectionName).doc(ic);
    var docRef1 = this.firestore.collection("profile").doc(ic);

    this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
    }).then(loading => {
      loading.present();
      docRef.get().subscribe(doc => {
        docRef1.get().subscribe(doc1 => {
        
        // To check ic is exist  
        if(doc1.exists){
        
        //To check user has been register
        if (doc.exists ) {
          return this.alertservice.presentToast("You already registered your account!!! Please login your account!!!");
        } else {
          
          // Check Duplicate Email
          var check = this.firestore.collection(this.collectionName, ref => ref.where('email', '==', email));
          check.get().subscribe(doc => {
            if (doc.empty) {// If not duplicate, then saved the data into record
              this.firestore.collection(this.collectionName).doc(ic).set({
                name: name,
                email: email,
                phone: phone,
                password: ""
            })
            this.sendactemail(ic,email).subscribe();
            this.alertservice.presentToast("You have success registered your account!!! Please view your email for set password.");
            } else {
            this.alertservice.presentToast("There have similar email address in the record!!! Please try again!!!");
            }
        }, error => { // doc.empty
          console.log(error);
        })   
        }
      }else{
        this.alertservice.presentToast("Your IC has not been registered!!! Please contact us your problem!!!");
      }
      }, error => { //doc1 exist
        console.log(error);
      })  
  
    }, error => { //doc exist
      console.log(error);
    }) 
      loading.dismiss();
    });
  }

  //send activation password form email
  sendactemail(ic, email){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.post(this.env.API_URL + 'api/sendpassword', {ic:ic, email:email}, {headers:headers,observe: 'response'});

  }


  // login function
  check_login(ic, password){
    var docRef = this.firestore.collection(this.collectionName).doc(ic);

    this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
    }).then(loading => {
      loading.present();
      docRef.get().subscribe(doc => {
        if (doc.exists) {
            var pass = doc.data()['password']
            var role = doc.data()['role']
            if (pass == password){
              if (role == "Admin"){
                this.isLoggedIn = true;
                this.storage.set('ic', ic)
                .then(
                    () => console.log('Stored item!'),
                    error => console.error('Error storing item', error)
                  );
                return this.router.navigate(['/admin']);
                
              }else if (role == null || role != null){
              this.isLoggedIn = true;
              this.storage.set('ic', ic)
              .then(
                  () => console.log('Stored item!'),
                  error => console.error('Error storing item', error)
                );
              return this.router.navigate(['/tabs/dashboard']);;
              }
            }else{
              return this.alertservice.presentToast("Wrong Password!!!");
            }
        } else {
            return this.alertservice.presentToast("Please register your account!!!");
        }
    }, error => {
      console.log(error);
    })
      loading.dismiss();
    });
    
  }

    // reset password function
    forget(email) {
      var check = this.firestore.collection(this.collectionName, ref => ref.where('email', '==', email));
      var  takeic = check.snapshotChanges();

      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        takeic.subscribe(data => {
          this.users = data.map(e => {
            return {
              ID: e.payload.doc.id
            };
        })
        })
        check.get().subscribe(doc => {
          if (doc.empty) {
            this.alertservice.presentToast("There have no email address!! Please register your account!!!");
          } else {
            this.sendresetemail(email).subscribe();
             this.alertservice.presentToast("The reset password email is sent to you");
             this.users = [];
          }
      }, error => {
        console.log(error);
      })
        loading.dismiss();
      });

   
    }
    
  //send reset password form from email
  sendresetemail(email){
    var id = this.users[0]["ID"];
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
    return this.http.post(this.env.API_URL + 'api/forgetpassword', {ic:id, email:email}, {headers:headers,observe: 'response'});
    
  }

  // To show profile
  user(id){
    return this.firestore.collection(this.collectionName).doc(id);
  }




  // To send email for feedback
  sendfeedback(ic, message, phone, photo){
    var docRef = this.firestore.collection(this.collectionName).doc(ic);

    this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
    }).then(loading => {
      loading.present();
      docRef.get().subscribe(doc => {
        var email = doc.data()['email'];
       
    //if file object is not exist
    if (photo == "" || photo == null){
      var value = "";
      this.sendfeedemail(ic,email,phone,value,message).subscribe();
    this.alertservice.presentToast("Feedback Submitted!!! The team will get back to you as soon as possible via Email. Thank you for your feedback!!!");
    return this.router.navigate(['/tabs/more']);
    }
    //if file object is exist
    else{
      this.path = `feedback/${new Date().getTime()}_${ic}`;
      const fileRef = this.fstorage.ref(this.path);
      // The main task
      this.fstorage.upload(this.path, photo).snapshotChanges().pipe(
        finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
             this.sendfeedemail(ic,email,phone,url,message).subscribe();
            })
            this.alertservice.presentToast("Feedback Submitted!!! The team will get back to you as soon as possible via Email. Thank you for your feedback!!!");
            return this.router.navigate(['/tabs/more']);
        })
      ).subscribe();
    }
    })
      loading.dismiss();
    }); 
  };

    //send reset password form from email
    sendfeedemail(ic,email,phone, photo, message){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      return this.http.post(this.env.API_URL + 'api/sendfeedback', {ic:ic, message:message, phone:phone, photo:photo, email:email}, {headers:headers,observe: 'response'})
    };


  //To change password for the users
  changepassword(id, cpassword,npassword){
    var docRef = this.firestore.collection(this.collectionName).doc(id);
    this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
    }).then(loading => {
      loading.present();
      docRef.get().subscribe(doc => {
        var pass = doc.data()['password'];
        if(cpassword != pass){
          this.alertservice.presentToast("The current password you have entered is incorrect");
        }else if (npassword == pass){
          this.alertservice.presentToast("The new password you have entered is cannot similar as current password");
        }else{
          docRef.update({
            password: npassword
          });
          this.alertservice.presentToast('Your password has been changed. Please log in again',);
          this.router.navigate(['/logout']);
        }
      
      }, error => {
        console.log(error);
      })
      loading.dismiss();
    });
  };

    //To change profile for the users
    editprofile(id, name, phone){
      var docRef = this.firestore.collection(this.collectionName).doc(id);
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        docRef.get().subscribe(doc => {
          if (doc.exists) {
            docRef.update({
              name: name,
              phone: phone
            });
            this.alertservice.presentToast("Your profile has been changed sucessfully!!!");
            this.router.navigate(['/settings']);
            
          }     
        }, error => {
          console.log(error);
        })
        loading.dismiss();
      });
    };

    //To change profile for the users
    read_profile(id){
      return this.firestore.collection(this.collectionName).doc(id).snapshotChanges();
    };

     //To read children details for father
   read_children_father(id) {
    return this.firestore.collection(this.profile, ref => ref.where('fatheric', '==', id));
  };

    //To read children details for mother
    read_children_mother(id) {
      return this.firestore.collection(this.profile, ref => ref.where('motheric', '==', id));
    };

    //To read children details 
    read_children_details(id) {
      return this.firestore.collection(this.profile).doc(id).snapshotChanges();
    };

  //To access for the children profile
  access(id) {
    return this.firestore.collection(this.profile).doc(id);
  };

  //To access for marry and read couple profile
  access_marry() {
    return this.firestore.collection("marriage");
  };

  //To read couple profile
  read_marry() {
    return this.firestore.collection("marriage");
  };
  

  //To read couple details for man
  read_marry_man(id) {
    return this.firestore.collection("marriage", ref => ref.where('manic', '==', id));
  };

   //To read couple details for woman
   read_marry_woman(id) {
      return this.firestore.collection("marriage", ref => ref.where('womanic', '==', id));
    };

  //To check age
  check_age(id){
    return this.firestore.collection(this.profile).doc(id);
  };



}