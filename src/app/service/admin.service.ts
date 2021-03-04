// admin function purpose
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertService } from 'src/app/service/alert.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  //Staff Login Collection Name
  login = 'login';
  //Add Citizen Collection Name
  profile = 'profile';
  // File Path
  path: string;
  //Worker ID
  id: any;

  constructor(
    private firestore: AngularFirestore,
    private alertservice :AlertService,
    private storage: AngularFireStorage,
    private router: Router,
    private alertService: AlertService,
    public loadingCtrl: LoadingController

  ) { }


  // add staff account function
  add_staff(id, ic, name, email, role, phone, password,picture) {
    var docRef = this.firestore.collection(this.login, ref => ref.where('ic', '==', ic));
    var checkid =this.firestore.collection(this.login).doc(ic);
    this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
    }).then(loading => {
      loading.present();
      checkid.get().subscribe(doc => {
        if (doc.exists) {
          return this.alertservice.presentToast("The Worker ID has been registered!!!");
        } else{
          docRef.get().subscribe(doc => {
            //if have duplicate ic
            if (!doc.empty) {
              return this.alertservice.presentToast("The Worker ID has been registered!!!");
            } 
            //not duplicate ic
            else {
                // Check Duplicate Email
              var check = this.firestore.collection(this.login, ref => ref.where('email', '==', email));
              check.get().subscribe(doc => {
                // If not duplicate, then saved the data into record
                if (doc.empty) {
                  //if file object is not exist
              if (picture == 0 || picture == null){
                var value = "";
                this.firestore.collection(this.login).doc(id).set({
                  ic: ic,
                  name: name,
                  email: email,
                  role: role,
                  phone: phone,
                  password: password,
                  picture: value
      
              })
              return this.alertservice.presentToast("The record is saved!!!");
              }
              //if file object is exist
              else{
                this.path = `workerpicture/${id}`;
      
                const fileRef = this.storage.ref(this.path);
            
                // The main task
                this.storage.upload(this.path, picture).snapshotChanges().pipe(
                  finalize(() => {
                      fileRef.getDownloadURL().subscribe((url) => {
                        this.firestore.collection(this.login).doc(id).set({
                          ic: ic,
                          name: name,
                          email: email,
                          role: role,
                          phone: phone,
                          password: password,
                          picture: url
              
                      })
                      })
                      return this.alertservice.presentToast("The record is saved!!!");
                  })
  
                ).subscribe();
              }
                } 
                else {
                   return this.alertservice.presentToast("There have similar email address in the record!!! Please try again!!!");
                }
            }, error => {
              console.log(error);
            }) 
            }
        }, error => {
          console.log(error);
        })
        }
      })
      loading.dismiss();
    });


   
  }

   // add user profile function
   add_profile(ic, birthcer,name, gender, race, religion, birthdate, address, city, postcode, state ) {
    var docRef = this.firestore.collection(this.profile).doc(ic);
    this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
    }).then(loading => {
      loading.present();
      docRef.get().subscribe(doc => {
        if (doc.exists ) {
          return this.alertservice.presentToast("The citizen has been added!!! Please try again!!!");
        } else {
           this.firestore.collection(this.profile).doc(ic).set({
            name: name,
            birthcertificate: birthcer,
            gender: gender,
            race: race,
            religion: religion,
            birthdate: birthdate,
            address: address,
            city: city,
            state: state,
            postcode: postcode,
            renew: "false",
            picture: ""
        })
        return this.alertservice.presentToast("The record is saved!!!");
        }
    }, error => {
      console.log(error);
    })
      loading.dismiss();
    });
  }

  //To read citizen profile
  read_citizen() {
    return this.firestore.collection(this.profile, ref => ref.orderBy("name" , "asc")).snapshotChanges();
  }

  //To access of the renew ic
  access(id) {
    return this.firestore.collection(this.profile).doc(id);
  }

   //To read citizen details 
   read_citizen_details(id) {
    return this.firestore.collection(this.profile).doc(id).snapshotChanges();
  }

    //To delete record for the citizen
    delete_citizen(record_id) {
      this.path = `profile/${record_id}`;
      const fileRef = this.storage.ref(this.path);
      var docRef = this.firestore.collection(this.profile).doc(record_id);
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        docRef.get().subscribe(doc => {
          var photo = doc.data()['picture'];
          if(photo == null || photo == ""){
            this.firestore.doc(this.profile + '/' + record_id).delete();
            this.alertService.presentToast("You have successfully delete this citizen!!!");
          }else{
            fileRef.delete();
            this.firestore.doc(this.profile + '/' + record_id).delete();
            this.alertService.presentToast("You have successfully delete this citizen!!!");
          }
          })
        loading.dismiss();
      });
     
    }

  //To update staff details
  update_citizen(recordID, record) {
    this.firestore.doc(this.profile + '/' + recordID).update(record);
  }

  //To read staff profile
  read_staff() {
    return this.firestore.collection(this.login, ref => ref.where('role', 'in', ['Admin', 'Staff'] )).snapshotChanges();
  }

  //To read staff details 
  read_staff_details(id) {
    return this.firestore.collection(this.login).doc(id).snapshotChanges();
  
  }

  //To update staff details
  update_staff(recordID, record) {
    this.firestore.doc(this.login + '/' + recordID).update(record);
  }

    //To update picture for staff
    update_picture(recordID, picture) {
      this.path = `workerpicture/${recordID}`;
      const fileRef = this.storage.ref(this.path);
      var docRef =this.firestore.collection(this.login).doc(recordID);
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        docRef.get().subscribe(doc => {
          var photo = doc.data()['picture'];
          if(photo == null || photo == "" ){
              // The main task
              this.storage.upload(this.path, picture).snapshotChanges().pipe(
                finalize(() => {
                    fileRef.getDownloadURL().subscribe((url) => {
                      this.firestore.doc(this.login + '/' + recordID).update({
                        picture: url
                      });
                    })
                    return this.alertservice.presentToast("The record is saved!!!");
                })
  
              ).subscribe();
          }else{
            fileRef.delete();
          // The main task
          this.storage.upload(this.path, picture).snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  this.firestore.doc(this.login + '/' + recordID).update({
                    picture: url
                  });
                })
                return this.alertservice.presentToast("The record is saved!!!");
            })
  
          ).subscribe();
          }
          })
        loading.dismiss();
      });
    }

  //To delete record for the staff
  delete_staff(record_id) {
    this.path = `workerpicture/${record_id}`;
    const fileRef = this.storage.ref(this.path);
    var docRef = this.firestore.collection(this.login).doc(record_id);
    this.loadingCtrl.create({
      spinner: 'circles',
      message: 'Please wait...',
      translucent: true,
    }).then(loading => {
      loading.present();
      docRef.get().subscribe(doc => {
        var photo = doc.data()['picture'];
        if(photo == null || photo == "" ){
          this.firestore.doc(this.login + '/' + record_id).delete();
        }else{
          fileRef.delete();
          this.firestore.doc(this.login + '/' + record_id).delete();
        }
        })
      loading.dismiss();
    });
  }

    //To update picture for user
    picture_user(recordID, picture) {
      this.path = `userpicture/${recordID}`;
      const fileRef = this.storage.ref(this.path);
      var docRef =this.firestore.collection(this.profile).doc(recordID);
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        docRef.get().subscribe(doc => {
          var photo = doc.data()['picture'];
          if(photo == null || photo == ""){
              // The main task
              this.storage.upload(this.path, picture).snapshotChanges().pipe(
                finalize(() => {
                    fileRef.getDownloadURL().subscribe((url) => {
                      this.firestore.doc(this.profile + '/' + recordID).update({
                        picture: url
                      });
                    })
                    this.alertservice.presentToast("The record is saved!!!");
                    this.router.navigate(['/settings']);
                })
  
              ).subscribe();
          }else{
            fileRef.delete();
          // The main task
          this.storage.upload(this.path, picture).snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  this.firestore.doc(this.login + '/' + recordID).update({
                    picture: url
                  });
                })
                this.alertservice.presentToast("The picture has successfully to upload!!!");
                this.router.navigate(['/settings']);
            })
  
          ).subscribe();
          }
          })
        loading.dismiss();
      });
    }


}



