import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { AlertService } from 'src/app/service/alert.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { LoadingController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EnvService } from './env.service';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  //Approval Flow Collection
  approval = 'approval';

   //Marry Collection
   marry = 'marriage';

  //Profile Collection
  profile = 'profile';

   //Login Collection
   login = 'login';
   
  //Profile Collection
  children = 'children';
  //user
  user:any;

  constructor(
    private firestore: AngularFirestore,
    private alertservice :AlertService,
    private storage: AngularFireStorage,
    private router: Router,
    private datepipe: DatePipe,
    public loadingCtrl: LoadingController,
    private http: HttpClient,
    private env: EnvService,
  ) { }

    //To register birth certificate from home with web
    birthwebhomeregister(motheric, fatheric, mothername, fathername, birthdate, birthtime, gender, name, email, phone, state, mothercopyic, 
      fathercopyic, caletter,poreport,docletter, marrycer, fatherdeath, motherdeath)
      {
       var dataRef = this.firestore.collection(this.approval);
       var check = this.firestore.collection(this.approval, ref => ref.where('motheric', '==', motheric).where('fatheric', '==', fatheric).where('name', '==', name).where('gender', '==', gender).where("status", "==" ,"progress"));
       var dataRef1 = this.firestore.collection(this.profile).doc(motheric);
       var dataRef2 = this.firestore.collection(this.profile).doc(fatheric);
       this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
    
      
        check.ref.where("status", "in" ,["complete","approve"]).get().then( doc => {
          //To check have register the birth certificate again 
            if(!doc.empty){
              this.alertservice.presentToast("You have register birth certificate again!!!")
            }else{
               //To check motheric is exist
         dataRef1.get().subscribe( doc => {
          if(!doc.exists){
            this.alertservice.presentToast("The mother idetification card is not exist!!! Please try to contact us immediately!!!")
          }else{
             //To check fatheric is exist
          dataRef2.get().subscribe( doc => {
            if(!doc.exists){
              this.alertservice.presentToast("The father idetification card is not exist!!! Please try to contact us immediately!!!")
            }else{        
              //To add database
              let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
              dataRef.add({
                motheric: motheric,
                fatheric: fatheric,
                mothername: mothername,
                fathername: fathername,
                birthdate: birthdate,
                birthtime: birthtime,
                email: email,
                phone: phone,
                gender: gender,
                state: state,
                name: name,
                status: "progress",
                mothercopyic : "",
                fathercopyic: "",
                marrycertificate: "",
                fatherdeathcertificate: "",
                motherdeathcertificate: "",
                cardletter: "",
                policereport: "",
                doctorletter: "",
                type: "birth-register",
                startdate: todaydate,
                statusdate: "",
                approveperson: "",
                completeperson: ""
            })
      
            //To upload mothercopyic path
            var mocopyic = `approval/birthcertificate/home/mothercopyic/${new Date().getTime()}_${motheric.pdf}`;
            var mourl = "";
            const fileRef = this.storage.ref(mocopyic);
      
            //To upload fathercopyic path
            var facopyic = `approval/birthcertificate/home/fathercopyic/${new Date().getTime()}_${fatheric}`;
            var faurl = "";
            const fileRef1 = this.storage.ref(facopyic);
      
            //To upload  Kad Pranatal/Kad Rawatan Semasa Ibu Mengandung/Surat akuan AM80 path
            var cardletter = `approval/birthcertificate/home/cardletter/${new Date().getTime()}_${'cardletter'}_${motheric}_${fatheric}`;
            var caurl = "";
            const fileRef2 = this.storage.ref(cardletter);
      
            //To upload police report path
            var policereport = `approval/birthcertificate/home/policereport/${new Date().getTime()}_${'policereport'}_${motheric}_${fatheric}`;
            var pourl = "";
            const fileRef3 = this.storage.ref(policereport);
      
            //To upload doctor letter path
            var doctorletter = `approval/birthcertificate/home/doctorletter/${new Date().getTime()}_${'docletter'}_${motheric}_${fatheric}`;
            var dourl = "";
            const fileRef4 = this.storage.ref(doctorletter);
             
            //To upload marry certificate path
             var marrycertificate = `approval/birthcertificate/home/marrycertificate/${new Date().getTime()}_${'marrycertificate'}_${motheric}_${fatheric}`;
             var maurl = "";
             const fileRef5 = this.storage.ref(marrycertificate);

              //To upload father death certificate path
              var fadecer = `approval/birthcertificate/home/fatherdeathcertificate/${new Date().getTime()}_${'fatherdeathcertificate'}_${fatheric}`;
              var fadeurl = "";
              const fileRef6 = this.storage.ref(fadecer);

               //To upload father death certificate path
               var modecer = `approval/birthcertificate/home/motherdeathcertificate/${new Date().getTime()}_${'motherdeathcertificate'}_${fatheric}`;
               var modeurl = "";
               const fileRef7 = this.storage.ref(modecer);

      
            
            //To upload mothercopyic 
            this.storage.upload(mocopyic, mothercopyic).snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  mourl = url;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        mothercopyic: mourl
                      });
                    })
                  })            
                })
            })
          ).subscribe();
      
          //To upload fathercopyic 
          this.storage.upload(facopyic, fathercopyic).snapshotChanges().pipe(
            finalize(() => {
                fileRef1.getDownloadURL().subscribe((url) => {
                  faurl = url;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        fathercopyic: faurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();
      
           //To upload Kad Pranatal/Kad Rawatan Semasa Ibu Mengandung/Surat akuan AM80 path
           this.storage.upload(cardletter, caletter).snapshotChanges().pipe(
            finalize(() => {
                fileRef2.getDownloadURL().subscribe((url1) => {
                  caurl = url1;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        cardletter: caurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();
      
          //To upload police report path
          this.storage.upload(policereport, poreport).snapshotChanges().pipe(
            finalize(() => {
                fileRef3.getDownloadURL().subscribe((url2) => {
                  pourl = url2;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        policereport: pourl
                      });
                    })
                  })            
                })
            })
          ).subscribe();
      
      
          //To upload doctor path
          this.storage.upload(doctorletter, docletter).snapshotChanges().pipe(
            finalize(() => {
                fileRef4.getDownloadURL().subscribe((url3) => {
                  dourl = url3;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        doctorletter: dourl
                      });
                    })
                  })            
                })
            })
          ).subscribe();

            //To upload marry path
            this.storage.upload(marrycertificate, marrycer).snapshotChanges().pipe(
              finalize(() => {
                  fileRef5.getDownloadURL().subscribe((url3) => {
                    maurl = url3;
        
                    // To get document id
                    check.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          marrycertificate: maurl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();

        if(fatherdeath != ""){
           //To upload fatherdeathcertificate path
           this.storage.upload(fadecer, fatherdeath).snapshotChanges().pipe(
            finalize(() => {
                fileRef6.getDownloadURL().subscribe((url3) => {
                  fadeurl = url3;

                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        fatherdeathcertificate: fadeurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();
        } 

        if(motherdeath != ""){
          //To upload fatherdeathcertificate path
          this.storage.upload(modecer, motherdeath).snapshotChanges().pipe(
           finalize(() => {
               fileRef7.getDownloadURL().subscribe((url3) => {
                 fadeurl = url3;

                 // To get document id
                 check.snapshotChanges().subscribe( set => {
                   set.map(e => {
                     var id = e.payload.doc.id;
                     this.firestore.doc(this.approval + '/' + id).update({
                       motherdeathcertificate: modeurl
                     });
                   })
                 })            
               })
           })
         ).subscribe();
       } 
          
                          
      
          this.alertservice.presentToast("The register of birth certificate is submitted!!!");
          this.router.navigate(['/tabs/more']);
          this.sendregisterbirth(mothername, fathername,name,email).subscribe();  
            }
           }, error => { // check fatheric error
            console.log(error);
          })
          }
          }, error => { // check motheric error
            console.log(error);
          })
            }
          
         }, error => { // check birth certificate error
          console.log(error);
        });
    
        loading.dismiss();
      });
      }

      //To register birth certificate from home with mobile
      birthmobilehomeregister(motheric, fatheric, mothername, fathername, birthdate,birthtime, gender, name, 
        email, phone, state, fmothercopyic,bmothercopyic,ffathercopyic,bfathercopyic, caletter,poreport,docletter,
        marrycer, fatherdeath, motherdeath)
        {
         var dataRef = this.firestore.collection(this.approval);
         var check = this.firestore.collection(this.approval, ref => ref.where('motheric', '==', motheric).where('fatheric', '==', fatheric).where('name', '==', name).where('gender', '==', gender).where("status", "==" ,"progress"));
         var dataRef1 = this.firestore.collection(this.profile).doc(motheric);
         var dataRef2 = this.firestore.collection(this.profile).doc(fatheric);
         this.loadingCtrl.create({
          spinner: 'circles',
          message: 'Please wait...',
          translucent: true,
        }).then(loading => {
          loading.present();
          check.ref.where("status", "in" ,["complete","approve"]).get().then( doc => {
            //To check have register the birth certificate again 
              if(!doc.empty){
                this.alertservice.presentToast("You have register birth certificate again!!!")
              }else{
                 //To check motheric is exist
           dataRef1.get().subscribe( doc => {
            if(!doc.exists){
              this.alertservice.presentToast("The mother idetification card is not exist!!! Please try to contact us immediately!!!")
            }else{
               //To check fatheric is exist
            dataRef2.get().subscribe( doc => {
              if(!doc.exists){
                this.alertservice.presentToast("The father idetification card is not exist!!! Please try to contact us immediately!!!")
              }else{        
                //To add database
                let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
                dataRef.add({
                  motheric: motheric,
                  fatheric: fatheric,
                  mothername: mothername,
                  fathername: fathername,
                  birthdate: birthdate,
                  birthtime: birthtime,
                  email: email,
                  phone: phone,
                  gender: gender,
                  state: state,
                  name: name,
                  status: "progress",
                  frontmothercopyic : "",
                  backmothercopyic : "",
                  frontfathercopyic: "",
                  backfathercopyic : "",
                  marrycertificate: "",
                fatherdeathcertificate: "",
                motherdeathcertificate: "",
                  cardletter: "",
                  policereport: "",
                  doctorletter: "",
                  type: "birth-register",
                  startdate: todaydate,
                  statusdate: "",
                  approveperson: "",
                  completeperson: ""
              })
        
              //To upload front mothercopyic path
              var fmocopyic = `approval/birthcertificate/home/mothercopyic/mobile/${new Date().getTime()}_${'front'}_${motheric}`;
              var fmourl = "";
              const fileRef = this.storage.ref(fmocopyic);
             
              //To upload back mothercopyic path
              var bmocopyic = `approval/birthcertificate/home/mothercopyic/mobile/${new Date().getTime()}_${'back'}_${motheric}`;
              var bmourl = "";
              const bm = this.storage.ref(bmocopyic);
        
              //To upload front fathercopyic path
              var ffacopyic = `approval/birthcertificate/home/fathercopyic/mobile${new Date().getTime()}_${'front'}_${fatheric}`;
              var ffaurl = "";
              const fileRef1 = this.storage.ref(ffacopyic);

              //To upload back fathercopyic path
              var bfacopyic = `approval/birthcertificate/home/mothercopyic/mobile/${new Date().getTime()}_${'back'}_${fatheric}`;
              var bfaurl = "";
              const bf = this.storage.ref(bfacopyic);                  
                      
              //To upload  Kad Pranatal/Kad Rawatan Semasa Ibu Mengandung/Surat akuan AM80 path
              var cardletter = `approval/birthcertificate/home/cardletter/${new Date().getTime()}_${'cardletter'}_${motheric}_${fatheric}`;
              var caurl = "";
              const fileRef2 = this.storage.ref(cardletter);
        
              //To upload police report path
              var policereport = `approval/birthcertificate/home/policereport/${new Date().getTime()}_${'policereport'}_${motheric}_${fatheric}`;
              var pourl = "";
              const fileRef3 = this.storage.ref(policereport);
        
              //To upload doctor letter path
              var doctorletter = `approval/birthcertificate/home/doctorletter/${new Date().getTime()}_${'docletter'}_${motheric}_${fatheric}`;
              var dourl = "";
              const fileRef4 = this.storage.ref(doctorletter);

               //To upload marry certificate path
             var marrycertificate = `approval/birthcertificate/home/marrycertificate/${new Date().getTime()}_${'marrycertificate'}_${motheric}_${fatheric}`;
             var maurl = "";
             const fileRef5 = this.storage.ref(marrycertificate);

              //To upload father death certificate path
              var fadecer = `approval/birthcertificate/home/fatherdeathcertificate/${new Date().getTime()}_${'fatherdeathcertificate'}_${fatheric}`;
              var fadeurl = "";
              const fileRef6 = this.storage.ref(fadecer);

               //To upload father death certificate path
               var modecer = `approval/birthcertificate/home/motherdeathcertificate/${new Date().getTime()}_${'motherdeathcertificate'}_${fatheric}`;
               var modeurl = "";
               const fileRef7 = this.storage.ref(modecer);

        
              
              //To upload frontmothercopyic 
              this.storage.upload(fmocopyic, fmothercopyic).snapshotChanges().pipe(
              finalize(() => {
                  fileRef.getDownloadURL().subscribe((url) => {
                    fmourl = url;
        
                    // To get document id
                    check.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          frontmothercopyic: fmourl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();

             //To upload backmothercopyic 
             this.storage.upload(bmocopyic, bmothercopyic).snapshotChanges().pipe(
              finalize(() => {
                  bm.getDownloadURL().subscribe((url) => {
                    bmourl = url;
        
                    // To get document id
                    check.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          backmothercopyic: bmourl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();

            //To upload frontfathercopyic 
            this.storage.upload(ffacopyic, ffathercopyic).snapshotChanges().pipe(
              finalize(() => {
                  fileRef1.getDownloadURL().subscribe((url1) => {
                    ffaurl = url1;
        
                    // To get document id
                    check.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          frontfathercopyic: ffaurl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();

             //To upload backfathercopyic 
             this.storage.upload(bfacopyic, bfathercopyic).snapshotChanges().pipe(
              finalize(() => {
                  bf.getDownloadURL().subscribe((url2) => {
                    bfaurl = url2;
        
                    // To get document id
                    check.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          backfathercopyic: bfaurl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();
        
            
        
             //To upload Kad Pranatal/Kad Rawatan Semasa Ibu Mengandung/Surat akuan AM80 path
             this.storage.upload(cardletter, caletter).snapshotChanges().pipe(
              finalize(() => {
                  fileRef2.getDownloadURL().subscribe((url3) => {
                    caurl = url3;
        
                    // To get document id
                    check.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          cardletter: caurl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();
        
            //To upload police report path
            this.storage.upload(policereport, poreport).snapshotChanges().pipe(
              finalize(() => {
                  fileRef3.getDownloadURL().subscribe((url4) => {
                    pourl = url4;
        
                    // To get document id
                    check.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          policereport: pourl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();
        
        
            //To upload doctor path
            this.storage.upload(doctorletter, docletter).snapshotChanges().pipe(
              finalize(() => {
                  fileRef4.getDownloadURL().subscribe((url5) => {
                    dourl = url5;
        
                    // To get document id
                    check.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          doctorletter: dourl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();

                        //To upload marry path
                        this.storage.upload(marrycertificate, marrycer).snapshotChanges().pipe(
                          finalize(() => {
                              fileRef5.getDownloadURL().subscribe((url3) => {
                                maurl = url3;
                    
                                // To get document id
                                check.snapshotChanges().subscribe( set => {
                                  set.map(e => {
                                    var id = e.payload.doc.id;
                                    this.firestore.doc(this.approval + '/' + id).update({
                                      marrycertificate: maurl
                                    });
                                  })
                                })            
                              })
                          })
                        ).subscribe();
            
                    if(fatherdeath != ""){
                       //To upload fatherdeathcertificate path
                       this.storage.upload(fadecer, fatherdeath).snapshotChanges().pipe(
                        finalize(() => {
                            fileRef6.getDownloadURL().subscribe((url3) => {
                              fadeurl = url3;
            
                              // To get document id
                              check.snapshotChanges().subscribe( set => {
                                set.map(e => {
                                  var id = e.payload.doc.id;
                                  this.firestore.doc(this.approval + '/' + id).update({
                                    fatherdeathcertificate: fadeurl
                                  });
                                })
                              })            
                            })
                        })
                      ).subscribe();
                    } 
            
                    if(motherdeath != ""){
                      //To upload fatherdeathcertificate path
                      this.storage.upload(modecer, motherdeath).snapshotChanges().pipe(
                       finalize(() => {
                           fileRef7.getDownloadURL().subscribe((url3) => {
                             fadeurl = url3;
            
                             // To get document id
                             check.snapshotChanges().subscribe( set => {
                               set.map(e => {
                                 var id = e.payload.doc.id;
                                 this.firestore.doc(this.approval + '/' + id).update({
                                   motherdeathcertificate: modeurl
                                 });
                               })
                             })            
                           })
                       })
                     ).subscribe();
                   } 
        
            this.alertservice.presentToast("The register of birth certificate is submitted!!!");
            this.router.navigate(['/tabs/more']);
            this.sendregisterbirth(mothername, fathername,name,email).subscribe();  
              }
             }, error => { // check fatheric error
              console.log(error);
            })
            }
            }, error => { // check motheric error
              console.log(error);
            })
              }
            
           }, error => { // check birth certificate error
            console.log(error);
          });
      
          loading.dismiss();
        });
        }




  //To register birth certificate from hospital with web
  birthwebhosregister(motheric, fatheric,mothername, fathername, birthdate, birthtime, gender, name, email, phone, 
    state, mothercopyic, fathercopyic, caletter,docletter,marrycer, fatherdeath, motherdeath)
    {
      var dataRef = this.firestore.collection(this.approval);
      var check = this.firestore.collection(this.approval, ref => ref.where('motheric', '==', motheric).where('fatheric', '==', fatheric).where('name', '==', name).where('gender', '==', gender).where("status", "==" ,"progress"));
      var dataRef1 = this.firestore.collection(this.profile).doc(motheric);
      var dataRef2 = this.firestore.collection(this.profile).doc(fatheric);
      this.loadingCtrl.create({
       spinner: 'circles',
       message: 'Please wait...',
       translucent: true,
     }).then(loading => {
       loading.present();
       check.ref.where("status", "in" ,["complete","approve"]).get().then( doc => {
         //To check have register the birth certificate again 
           if(!doc.empty){
             this.alertservice.presentToast("You have register birth certificate again!!!")
           }else{
              //To check motheric is exist
        dataRef1.get().subscribe( doc => {
         if(!doc.exists){
           this.alertservice.presentToast("The mother idetification card is not exist!!! Please try to contact us immediately!!!")
         }else{
            //To check fatheric is exist
         dataRef2.get().subscribe( doc => {
           if(!doc.exists){
             this.alertservice.presentToast("The father idetification card is not exist!!! Please try to contact us immediately!!!")
           }else{        
             //To add database
             let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
             dataRef.add({
               motheric: motheric,
               fatheric: fatheric,
               mothername: mothername,
               fathername: fathername,
               birthdate: birthdate,
               birthtime: birthtime,
               email: email,
               phone: phone,
               gender: gender,
               state: state,
               name: name,
               status: "progress",
               mothercopyic : "",
               fathercopyic: "",
               cardletter: "",
               marrycertificate: "",
                fatherdeathcertificate: "",
                motherdeathcertificate: "",
               doctorletter: "",
               type: "birth-register",
               startdate: todaydate,
               statusdate: "",
               approveperson: "",
               completeperson: ""
           })
     
           //To upload mothercopyic path
           var mocopyic = `approval/birthcertificate/home/mothercopyic/${new Date().getTime()}_${motheric}`;
           var mourl = "";
           const fileRef = this.storage.ref(mocopyic);
     
           //To upload fathercopyic path
           var facopyic = `approval/birthcertificate/hospital/fathercopyic/${new Date().getTime()}_${fatheric}`;
           var faurl = "";
           const fileRef1 = this.storage.ref(facopyic);
     
           //To upload  Kad Pranatal/Kad Rawatan Semasa Ibu Mengandung/Surat akuan AM80 path
           var cardletter = `approval/birthcertificate/hospital/cardletter/${new Date().getTime()}_${'cardletter'}_${motheric}_${fatheric}`;
           var caurl = "";
           const fileRef2 = this.storage.ref(cardletter);
     
           //To upload doctor letter path
           var doctorletter = `approval/birthcertificate/hospital/doctorletter/${new Date().getTime()}_${'docletter'}_${motheric}_${fatheric}`;
           var dourl = "";
           const fileRef4 = this.storage.ref(doctorletter);

            //To upload marry certificate path
            var marrycertificate = `approval/birthcertificate/hospital/marrycertificate/${new Date().getTime()}_${'marrycertificate'}_${motheric}_${fatheric}`;
            var maurl = "";
            const fileRef5 = this.storage.ref(marrycertificate);

             //To upload father death certificate path
             var fadecer = `approval/birthcertificate/hospital/fatherdeathcertificate/${new Date().getTime()}_${'fatherdeathcertificate'}_${fatheric}`;
             var fadeurl = "";
             const fileRef6 = this.storage.ref(fadecer);

              //To upload father death certificate path
              var modecer = `approval/birthcertificate/hospital/motherdeathcertificate/${new Date().getTime()}_${'motherdeathcertificate'}_${fatheric}`;
              var modeurl = "";
              const fileRef7 = this.storage.ref(modecer);

     
           
           //To upload mothercopyic 
           this.storage.upload(mocopyic, mothercopyic).snapshotChanges().pipe(
           finalize(() => {
               fileRef.getDownloadURL().subscribe((url) => {
                 mourl = url;
     
                 // To get document id
                 check.snapshotChanges().subscribe( set => {
                   set.map(e => {
                     var id = e.payload.doc.id;
                     this.firestore.doc(this.approval + '/' + id).update({
                       mothercopyic: mourl
                     });
                   })
                 })            
               })
           })
         ).subscribe();
     
         //To upload fathercopyic 
         this.storage.upload(facopyic, fathercopyic).snapshotChanges().pipe(
           finalize(() => {
               fileRef1.getDownloadURL().subscribe((url1) => {
                 faurl = url1;
     
                 // To get document id
                 check.snapshotChanges().subscribe( set => {
                   set.map(e => {
                     var id = e.payload.doc.id;
                     this.firestore.doc(this.approval + '/' + id).update({
                       fathercopyic: faurl
                     });
                   })
                 })            
               })
           })
         ).subscribe();
     
          //To upload Kad Pranatal/Kad Rawatan Semasa Ibu Mengandung/Surat akuan AM80 path
          this.storage.upload(cardletter, caletter).snapshotChanges().pipe(
           finalize(() => {
               fileRef2.getDownloadURL().subscribe((url2) => {
                 caurl = url2;
     
                 // To get document id
                 check.snapshotChanges().subscribe( set => {
                   set.map(e => {
                     var id = e.payload.doc.id;
                     this.firestore.doc(this.approval + '/' + id).update({
                       cardletter: caurl
                     });
                   })
                 })            
               })
           })
         ).subscribe();
     
         //To upload doctor path
         this.storage.upload(doctorletter, docletter).snapshotChanges().pipe(
           finalize(() => {
               fileRef4.getDownloadURL().subscribe((url3) => {
                 dourl = url3;
     
                 // To get document id
                 check.snapshotChanges().subscribe( set => {
                   set.map(e => {
                     var id = e.payload.doc.id;
                     this.firestore.doc(this.approval + '/' + id).update({
                       doctorletter: dourl
                     });
                   })
                 })            
               })
           })
         ).subscribe();

                     //To upload marry path
                     this.storage.upload(marrycertificate, marrycer).snapshotChanges().pipe(
                      finalize(() => {
                          fileRef5.getDownloadURL().subscribe((url3) => {
                            maurl = url3;
                
                            // To get document id
                            check.snapshotChanges().subscribe( set => {
                              set.map(e => {
                                var id = e.payload.doc.id;
                                this.firestore.doc(this.approval + '/' + id).update({
                                  marrycertificate: maurl
                                });
                              })
                            })            
                          })
                      })
                    ).subscribe();
        
                if(fatherdeath != ""){
                   //To upload fatherdeathcertificate path
                   this.storage.upload(fadecer, fatherdeath).snapshotChanges().pipe(
                    finalize(() => {
                        fileRef6.getDownloadURL().subscribe((url3) => {
                          fadeurl = url3;
        
                          // To get document id
                          check.snapshotChanges().subscribe( set => {
                            set.map(e => {
                              var id = e.payload.doc.id;
                              this.firestore.doc(this.approval + '/' + id).update({
                                fatherdeathcertificate: fadeurl
                              });
                            })
                          })            
                        })
                    })
                  ).subscribe();
                } 
        
                if(motherdeath != ""){
                  //To upload fatherdeathcertificate path
                  this.storage.upload(modecer, motherdeath).snapshotChanges().pipe(
                   finalize(() => {
                       fileRef7.getDownloadURL().subscribe((url3) => {
                         fadeurl = url3;
        
                         // To get document id
                         check.snapshotChanges().subscribe( set => {
                           set.map(e => {
                             var id = e.payload.doc.id;
                             this.firestore.doc(this.approval + '/' + id).update({
                               motherdeathcertificate: modeurl
                             });
                           })
                         })            
                       })
                   })
                 ).subscribe();
               } 
     
         this.alertservice.presentToast("The register of birth certificate is submitted!!!");
         this.router.navigate(['/tabs/more']);
         this.sendregisterbirth(mothername, fathername,name,email).subscribe();  
           }
          }, error => { // check fatheric error
           console.log(error);
         })
         }
         }, error => { // check motheric error
           console.log(error);
         })
           }
         
        }, error => { // check birth certificate error
         console.log(error);
       });

       loading.dismiss();
     });
    }

    //To register birth certificate from hospital with mobile
    birthmobilehosregister(motheric, fatheric,mothername, fathername, birthdate, birthtime, 
      gender, name, email, phone, state, fmothercopyic, bmothercopyic,ffathercopyic,bfathercopyic, caletter,
      docletter,marrycer, fatherdeath, motherdeath)
    {
      var dataRef = this.firestore.collection(this.approval);
      var check = this.firestore.collection(this.approval, ref => ref.where('motheric', '==', motheric).where('fatheric', '==', fatheric).where('name', '==', name).where('gender', '==', gender).where("status", "==" ,"progress"));
      var dataRef1 = this.firestore.collection(this.profile).doc(motheric);
      var dataRef2 = this.firestore.collection(this.profile).doc(fatheric);
      this.loadingCtrl.create({
       spinner: 'circles',
       message: 'Please wait...',
       translucent: true,
     }).then(loading => {
       loading.present();
       check.ref.where("status", "in" ,["complete","approve"]).get().then( doc => {
         //To check have register the birth certificate again 
           if(!doc.empty){
             this.alertservice.presentToast("You have register birth certificate again!!!")
           }else{
              //To check motheric is exist
        dataRef1.get().subscribe( doc => {
         if(!doc.exists){
           this.alertservice.presentToast("The mother idetification card is not exist!!! Please try to contact us immediately!!!")
         }else{
            //To check fatheric is exist
         dataRef2.get().subscribe( doc => {
           if(!doc.exists){
             this.alertservice.presentToast("The father idetification card is not exist!!! Please try to contact us immediately!!!")
           }else{        
             //To add database
             let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
             dataRef.add({
               motheric: motheric,
               fatheric: fatheric,
               mothername: mothername,
               fathername: fathername,
               birthdate: birthdate,
               birthtime: birthtime,
               email: email,
               phone: phone,
               gender: gender,
               state: state,
               name: name,
               status: "progress",
               frontmothercopyic : "",
               backmothercopyic : "",
               frontfathercopyic: "",
               backfathercopyic : "",
               marrycertificate: "",
                fatherdeathcertificate: "",
                motherdeathcertificate: "",
               cardletter: "",
               doctorletter: "",
               type: "birth-register",
               startdate: todaydate,
               statusdate: "",
               approveperson: "",
               completeperson: ""
           })
     
           //To upload front mothercopyic path
           var fmocopyic = `approval/birthcertificate/hospital/mothercopyic/mobile/${new Date().getTime()}_${'front'}_${motheric}`;
           var fmourl = "";
           const fileRef = this.storage.ref(fmocopyic);
          
           //To upload back mothercopyic path
           var bmocopyic = `approval/birthcertificate/hospital/mothercopyic/mobile/${new Date().getTime()}_${'back'}_${motheric}`;
           var bmourl = "";
           const bm = this.storage.ref(bmocopyic);
     
           //To upload front fathercopyic path
           var ffacopyic = `approval/birthcertificate/hospital/fathercopyic/mobile${new Date().getTime()}_${'front'}_${fatheric}`;
           var ffaurl = "";
           const fileRef1 = this.storage.ref(ffacopyic);

           //To upload back fathercopyic path
           var bfacopyic = `approval/birthcertificate/hospital/mothercopyic/mobile/${new Date().getTime()}_${'back'}_${fatheric}`;
           var bfaurl = "";
           const bf = this.storage.ref(bfacopyic);    
     
           //To upload  Kad Pranatal/Kad Rawatan Semasa Ibu Mengandung/Surat akuan AM80 path
           var cardletter = `approval/birthcertificate/hospital/cardletter/${new Date().getTime()}_${'cardletter'}_${motheric}_${fatheric}`;
           var caurl = "";
           const fileRef2 = this.storage.ref(cardletter);
     
           //To upload doctor letter path
           var doctorletter = `approval/birthcertificate/hospital/doctorletter/${new Date().getTime()}_${'docletter'}_${motheric}_${fatheric}`;
           var dourl = "";
           const fileRef4 = this.storage.ref(doctorletter);

             //To upload marry certificate path
             var marrycertificate = `approval/birthcertificate/hospital/marrycertificate/${new Date().getTime()}_${'marrycertificate'}_${motheric}_${fatheric}`;
             var maurl = "";
             const fileRef5 = this.storage.ref(marrycertificate);
 
              //To upload father death certificate path
              var fadecer = `approval/birthcertificate/hospital/fatherdeathcertificate/${new Date().getTime()}_${'fatherdeathcertificate'}_${fatheric}`;
              var fadeurl = "";
              const fileRef6 = this.storage.ref(fadecer);
 
               //To upload father death certificate path
               var modecer = `approval/birthcertificate/hospital/motherdeathcertificate/${new Date().getTime()}_${'motherdeathcertificate'}_${fatheric}`;
               var modeurl = "";
               const fileRef7 = this.storage.ref(modecer);
     
           
             //To upload frontmothercopyic 
             this.storage.upload(fmocopyic, fmothercopyic).snapshotChanges().pipe(
              finalize(() => {
                  fileRef.getDownloadURL().subscribe((url1) => {
                    fmourl = url1;
        
                    // To get document id
                    check.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          frontmothercopyic: fmourl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();

             //To upload backmothercopyic 
             this.storage.upload(bmocopyic, bmothercopyic).snapshotChanges().pipe(
              finalize(() => {
                  bm.getDownloadURL().subscribe((url2) => {
                    bmourl = url2;
        
                    // To get document id
                    check.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          backmothercopyic: bmourl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();

            //To upload frontfathercopyic 
            this.storage.upload(ffacopyic, ffathercopyic).snapshotChanges().pipe(
              finalize(() => {
                  fileRef1.getDownloadURL().subscribe((url3) => {
                    ffaurl = url3;
        
                    // To get document id
                    check.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          frontfathercopyic: ffaurl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();

             //To upload backfathercopyic 
             this.storage.upload(bfacopyic, bfathercopyic).snapshotChanges().pipe(
              finalize(() => {
                  bf.getDownloadURL().subscribe((url4) => {
                    bfaurl = url4;
        
                    // To get document id
                    check.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          backfathercopyic: bfaurl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();
     
          //To upload Kad Pranatal/Kad Rawatan Semasa Ibu Mengandung/Surat akuan AM80 path
          this.storage.upload(cardletter, caletter).snapshotChanges().pipe(
           finalize(() => {
               fileRef2.getDownloadURL().subscribe((url5) => {
                 caurl = url5;
     
                 // To get document id
                 check.snapshotChanges().subscribe( set => {
                   set.map(e => {
                     var id = e.payload.doc.id;
                     this.firestore.doc(this.approval + '/' + id).update({
                       cardletter: caurl
                     });
                   })
                 })            
               })
           })
         ).subscribe();
     
         //To upload doctor path
         this.storage.upload(doctorletter, docletter).snapshotChanges().pipe(
           finalize(() => {
               fileRef4.getDownloadURL().subscribe((url6) => {
                 dourl = url6;
     
                 // To get document id
                 check.snapshotChanges().subscribe( set => {
                   set.map(e => {
                     var id = e.payload.doc.id;
                     this.firestore.doc(this.approval + '/' + id).update({
                       doctorletter: dourl
                     });
                   })
                 })            
               })
           })
         ).subscribe();

                     //To upload marry path
                     this.storage.upload(marrycertificate, marrycer).snapshotChanges().pipe(
                      finalize(() => {
                          fileRef5.getDownloadURL().subscribe((url3) => {
                            maurl = url3;
                
                            // To get document id
                            check.snapshotChanges().subscribe( set => {
                              set.map(e => {
                                var id = e.payload.doc.id;
                                this.firestore.doc(this.approval + '/' + id).update({
                                  marrycertificate: maurl
                                });
                              })
                            })            
                          })
                      })
                    ).subscribe();
        
                if(fatherdeath != ""){
                   //To upload fatherdeathcertificate path
                   this.storage.upload(fadecer, fatherdeath).snapshotChanges().pipe(
                    finalize(() => {
                        fileRef6.getDownloadURL().subscribe((url3) => {
                          fadeurl = url3;
        
                          // To get document id
                          check.snapshotChanges().subscribe( set => {
                            set.map(e => {
                              var id = e.payload.doc.id;
                              this.firestore.doc(this.approval + '/' + id).update({
                                fatherdeathcertificate: fadeurl
                              });
                            })
                          })            
                        })
                    })
                  ).subscribe();
                } 
        
                if(motherdeath != ""){
                  //To upload fatherdeathcertificate path
                  this.storage.upload(modecer, motherdeath).snapshotChanges().pipe(
                   finalize(() => {
                       fileRef7.getDownloadURL().subscribe((url3) => {
                         fadeurl = url3;
        
                         // To get document id
                         check.snapshotChanges().subscribe( set => {
                           set.map(e => {
                             var id = e.payload.doc.id;
                             this.firestore.doc(this.approval + '/' + id).update({
                               motherdeathcertificate: modeurl
                             });
                           })
                         })            
                       })
                   })
                 ).subscribe();
               } 
     
         this.alertservice.presentToast("The register of birth certificate is submitted!!!");
         this.router.navigate(['/tabs/more']);
         this.sendregisterbirth(mothername, fathername,name,email).subscribe();  
           }
          }, error => { // check fatheric error
           console.log(error);
         })
         }
         }, error => { // check motheric error
           console.log(error);
         })
           }
         
        }, error => { // check birth certificate error
         console.log(error);
       });

       loading.dismiss();
     });
    };

  //To check form exist
  check_exist(birth){
    return  this.firestore.collection(this.approval, ref => ref.where("birthcertificate", "==", birth).where("status", 'in', ['progress', 'complete','approve']));
   
  };

     //To register ic with web
     webregisteric(birth,parentic, parentname, name,race,religion,address, city, postcode,state,email, phone, 
      parentcopyic,birthcopy, photo, suppaddr)
      {
       var dataRef = this.firestore.collection(this.approval);
       var check = this.firestore.collection(this.approval, ref => ref.where('parentic', '==', parentic).where('birthcertificate', '==', birth));
       var dataRef1 = this.firestore.collection(this.profile).doc(parentic);
       this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
         dataRef1.get().subscribe( doc => {
          if(!doc.exists){
            this.alertservice.presentToast("The parents idetification card is not exist!!! Please try to contact us immediately!!!")
          }else{
  
              //To add database
              let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
              dataRef.add({
                parentic: parentic,
                parentname: parentname,
                name: name,
                race: race,
                birthcertificate: birth,
                religion: religion,
                address: address,
                postcode: postcode,
                city: city,
                email: email,
                state: state,
                phone: phone,
                status: "progress",
                parentcopyic : "",
                birthcertificatecopy: "",
                photo: "",
                suppaddress: "",
                type: "ic-register",
                startdate: todaydate,
                statusdate: "",
                approveperson: "",
                completeperson: ""
            });

     
      
            //To upload parentcopyic path
            var pacopyic = `approval/registeric/parentcopyic/${new Date().getTime()}_${parentic}`
            var paurl = "";
            const fileRef = this.storage.ref(pacopyic);
      
      
            //To upload birth certificate copy path
            var bircopy = `approval/registeric/birthcertificate/${new Date().getTime()}_${birth}`;
            var biurl = "";
            const fileRef2 = this.storage.ref(bircopy);
        
           
            //To upload photo path
            var uplphoto = `approval/registeric/photo/${new Date().getTime()}_${'photo'}_${birth}`;
            var phurl = "";
            const fileRef3 = this.storage.ref(uplphoto);
      
            //To upload supporting document for address path
            var supappr = `approval/registeric/supportingdocumentaddress/${new Date().getTime()}_${'suppaddr'}_${parentic}_${birth}`;
            var suurl = "";
            const fileRef4 = this.storage.ref(supappr);
      
            
            //To upload parentcopyic 
            this.storage.upload(pacopyic, parentcopyic).snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  paurl = url;
                 
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        parentcopyic: paurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();
      
          
          //To upload birth certificate copy path
          this.storage.upload(bircopy, birthcopy).snapshotChanges().pipe(
            finalize(() => {
                fileRef2.getDownloadURL().subscribe((url1) => {
                  biurl = url1;
                  
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        birthcertificatecopy: biurl
                      });
                    });
                  });            
                });
                
            })
          ).subscribe();
      
      
          //To upload photo path
          this.storage.upload(uplphoto, photo).snapshotChanges().pipe(
            finalize(() => {
                fileRef3.getDownloadURL().subscribe((url2) => {
                  phurl = url2;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        photo: phurl
                      });
                    });
                  });          
                });
            })
          ).subscribe();

           //To upload supporting document for address path
           this.storage.upload(supappr, suppaddr).snapshotChanges().pipe(
            finalize(() => {
                fileRef4.getDownloadURL().subscribe((url3) => {
                  suurl = url3;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        suppaddress: suurl
                      });
                    });
                  });           
                });
            })
          ).subscribe();
      
          this.alertservice.presentToast("The register of identification cards is submitted!!!");
          this.router.navigate(['/tabs/more']);
          this.sendregisteric(parentname, birth,name,email).subscribe();  
          
          }
          }, error => { // check parentic error
            console.log(error);
          })
          
       
         
        loading.dismiss();
      });
      };

        //To register ic with mobile
     mobileregisteric(birth,parentic, parentname, name,race,religion,address, city, postcode,state,email, phone, 
      fparentcopyic,bparentcopyic,birthcopy, photo, suppaddr)
      {
       var dataRef = this.firestore.collection(this.approval);
       var check = this.firestore.collection(this.approval, ref => ref.where('parentic', '==', parentic).where('birthcertificate', '==', birth));
       var dataRef1 = this.firestore.collection(this.profile).doc(parentic);
       this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
         dataRef1.get().subscribe( doc => {
          if(!doc.exists){
            this.alertservice.presentToast("The parents idetification card is not exist!!! Please try to contact us immediately!!!")
          }else{
  
              //To add database
              let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
              dataRef.add({
                parentic: parentic,
                parentname: parentname,
                name: name,
                race: race,
                religion: religion,
                address: address,
                postcode: postcode,
                city: city,
                email: email,
                state: state,
                phone: phone,
                status: "progress",
                frontparentcopyic : "",
                backparentcopyic : "",
                birthcertificatecopy: "",
                photo: "",
                suppaddress: "",
                type: "ic-register",
                startdate: todaydate,
                statusdate: "",
                approveperson: "",
                completeperson: ""
            })
      
            //To upload frontparentcopyic path
            var fpacopyic = `approval/registeric/parentcopyic/mobile/${new Date().getTime()}_${"front"}_${parentic}`;
            var fpaurl = "";
            const fileRef = this.storage.ref(fpacopyic);

            //To upload frontparentcopyic path
            var bpacopyic = `approval/registeric/parentcopyic/mobile/${new Date().getTime()}_${"back"}_${parentic}`;
            var bpaurl = "";
            const bp = this.storage.ref(bpacopyic);            
      
            //To upload birth certificate copy path
            var bircopy = `approval/registeric/birthcertificate/${new Date().getTime()}_${birth}`;
            var biurl = "";
            const fileRef2 = this.storage.ref(bircopy);
      
            //To upload photo path
            var uplphoto = `approval/registeric/photo/${new Date().getTime()}_${'photo'}_${birth}`;
            var phurl = "";
            const fileRef3 = this.storage.ref(uplphoto);
      
            //To upload supporting document for address path
            var supappr = `approval/registeric/supportingdocumentaddress/${new Date().getTime()}_${'suppaddr'}_${parentic}_${birth}`;
            var suurl = "";
            const fileRef4 = this.storage.ref(supappr);
      
            
            //To upload frontparentcopyic 
            this.storage.upload(fpacopyic, fparentcopyic).snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL().subscribe((url1) => {
                  fpaurl = url1;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        frontparentcopyic: fpaurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();

          //To upload backparentcopyic 
          this.storage.upload(bpacopyic, bparentcopyic).snapshotChanges().pipe(
            finalize(() => {
                bp.getDownloadURL().subscribe((url2) => {
                  bpaurl = url2;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        backparentcopyic: bpaurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();
      
         
          //To upload birth certificate copy path
          this.storage.upload(bircopy, birthcopy).snapshotChanges().pipe(
            finalize(() => {
                fileRef2.getDownloadURL().subscribe((url3) => {
                  biurl = url3;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        birthcertificatecopy: biurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();
      
      
          //To upload photo path
          this.storage.upload(uplphoto, photo).snapshotChanges().pipe(
            finalize(() => {
                fileRef3.getDownloadURL().subscribe((url4) => {
                  phurl = url4;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        photo: phurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();

           //To upload supporting document for address path
           this.storage.upload(supappr, suppaddr).snapshotChanges().pipe(
            finalize(() => {
                fileRef4.getDownloadURL().subscribe((url5) => {
                  suurl = url5;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        suppaddress: suurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();
      
          this.alertservice.presentToast("The register of idetification cards is submitted!!!");
          this.router.navigate(['/tabs/more']);
          this.sendregisteric(parentname, birth,name,email).subscribe();  
          
          }
          }, error => { // check motheric error
            console.log(error);
          })
          
    
        loading.dismiss();
      });
      };

    //To renew ic with web
     webrenewic(ic,name,email,phone,copyic,photo,suppaddr)
      {
       var dataRef = this.firestore.collection(this.approval);
       var check = this.firestore.collection(this.approval, ref=> ref.where("ic", "==", ic).where("status", "==", 'progress').where("type", "==", 'ic-renew'));
       this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        dataRef.ref.where("ic", "==", ic).where("status", "in", ['progress', 'complete','approve']).get().then( doc => {
          if(!doc.empty){
            this.alertservice.presentToast("You have submit renew identification cards already or the staff completed your renew identification cards services!!!")
          }else{
         

            //To add database
            let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
            dataRef.add({
              ic: ic,
              name: name,
              email: email,
              phone: phone,
              status: "progress",
              copyic : "",
              photo: "",
              suppaddress: "",
              type: "ic-renew",
              startdate: todaydate,
              statusdate: "",
              approveperson: "",
              completeperson: ""
            
          })
      
            //To upload copyic path
            var coic = `approval/renewic/copyic/${new Date().getTime()}_${ic}`
            var courl = "";
            const fileRef = this.storage.ref(coic);
           
            //To upload photo path
            var uplphoto = `approval/renewic/photo/${new Date().getTime()}_${'photo'}_${ic}`;
            var phurl = "";
            const fileRef3 = this.storage.ref(uplphoto);
      
            //To upload supporting document for address path
            var supappr = `approval/renewic/supportingdocumentaddress/${new Date().getTime()}_${'suppaddr'}_${ic}`;
            var suurl = "";
            const fileRef4 = this.storage.ref(supappr);
      
            
            //To upload copyic 
            this.storage.upload(coic, copyic).snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  courl = url;
                 
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        copyic: courl
                      });
                    })
                  })            
                })
            })
          ).subscribe();

          //To upload photo path
          this.storage.upload(uplphoto, photo).snapshotChanges().pipe(
            finalize(() => {
                fileRef3.getDownloadURL().subscribe((url2) => {
                  phurl = url2;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        photo: phurl
                      });
                    });
                  });          
                });
            })
          ).subscribe();

           //To upload supporting document for address path
           this.storage.upload(supappr, suppaddr).snapshotChanges().pipe(
            finalize(() => {
                fileRef4.getDownloadURL().subscribe((url3) => {
                  suurl = url3;
      
                  // To get document id
                  check.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        suppaddress: suurl
                      });
                    });
                  });           
                });
            })
          ).subscribe();
      
          this.alertservice.presentToast("The renew of identification cards is submitted!!!");
          this.router.navigate(['/tabs/more']);
          this.sendrenewic(ic,name,email).subscribe();  
          
          }
          }, error => { // check ic error
            console.log(error);
          })
          
         
        loading.dismiss();
      });
      };

 //To renew ic with mobile
 mobilerenewic(ic,name,email,phone,fcopyic,bcopyic,photo,suppaddr)
 {
  var dataRef = this.firestore.collection(this.approval);
  var check = this.firestore.collection(this.approval, ref=> ref.where("ic", "==", ic).where("status", "==", 'progress').where("type", "==", 'ic-renew'));
  this.loadingCtrl.create({
   spinner: 'circles',
   message: 'Please wait...',
   translucent: true,
 }).then(loading => {
   loading.present();
   dataRef.ref.where("ic", "==", ic).where("status", "in", ['progress', 'complete','approve']).get().then( doc => {
     if(!doc.empty){
       this.alertservice.presentToast("You have submit renew identification cards already or the staff completed your renew identification cards services!!!")
     }else{
       

       //To add database
       let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
       dataRef.add({
         ic: ic,
         name: name,
         email: email,
         phone: phone,
         status: "progress",
         frontcopyic : "",
         backcopyic : "",
         photo: "",
         suppaddress: "",
         type: "ic-renew",
         startdate: todaydate,
         statusdate: "",
         approveperson: "",
         completeperson: ""
       
     })

       //To upload front copyic path
       var fcoic = `approval/renewic/mobile/${new Date().getTime()}_${"front"}_${ic}`
       var fcourl = "";
       const fileRef = this.storage.ref(fcoic);

        //To upload front copyic path
        var bcoic = `approval/renewic/mobile/${new Date().getTime()}_${"back"}_${ic}`
        var bcourl = "";
        const bc = this.storage.ref(bcoic);
      
       //To upload photo path
       var uplphoto = `approval/renewic/photo/${new Date().getTime()}_${'photo'}_${ic}`;
       var phurl = "";
       const fileRef3 = this.storage.ref(uplphoto);
 
       //To upload supporting document for address path
       var supappr = `approval/renewic/supportingdocumentaddress/${new Date().getTime()}_${'suppaddr'}_${ic}`;
       var suurl = "";
       const fileRef4 = this.storage.ref(supappr);
 
       
       //To upload frontcopyic 
       this.storage.upload(fcoic, fcopyic).snapshotChanges().pipe(
       finalize(() => {
           fileRef.getDownloadURL().subscribe((url) => {
             fcourl = url;
            
             // To get document id
             check.snapshotChanges().subscribe( set => {
               set.map(e => {
                 var id = e.payload.doc.id;
                 this.firestore.doc(this.approval + '/' + id).update({
                   frontcopyic: fcourl
                 });
               })
             })            
           })
       })
     ).subscribe();

      //To upload backcopyic 
      this.storage.upload(bcoic, bcopyic).snapshotChanges().pipe(
        finalize(() => {
            bc.getDownloadURL().subscribe((url) => {
              bcourl = url;
             
              // To get document id
              check.snapshotChanges().subscribe( set => {
                set.map(e => {
                  var id = e.payload.doc.id;
                  this.firestore.doc(this.approval + '/' + id).update({
                    backcopyic: bcourl
                  });
                })
              })            
            })
        })
      ).subscribe();

     //To upload photo path
     this.storage.upload(uplphoto, photo).snapshotChanges().pipe(
       finalize(() => {
           fileRef3.getDownloadURL().subscribe((url2) => {
             phurl = url2;
 
             // To get document id
             check.snapshotChanges().subscribe( set => {
               set.map(e => {
                 var id = e.payload.doc.id;
                 this.firestore.doc(this.approval + '/' + id).update({
                   photo: phurl
                 });
               });
             });          
           });
       })
     ).subscribe();

      //To upload supporting document for address path
      this.storage.upload(supappr, suppaddr).snapshotChanges().pipe(
       finalize(() => {
           fileRef4.getDownloadURL().subscribe((url3) => {
             suurl = url3;
 
             // To get document id
             check.snapshotChanges().subscribe( set => {
               set.map(e => {
                 var id = e.payload.doc.id;
                 this.firestore.doc(this.approval + '/' + id).update({
                   suppaddress: suurl
                 });
               });
             });           
           });
       })
     ).subscribe();
 
     this.alertservice.presentToast("The renew of identification cards is submitted!!!");
     this.router.navigate(['/tabs/more']);
     this.sendrenewic(ic,name,email).subscribe();  
     
     }
     }, error => { // check parentic error
       console.log(error);
     })
     
    
   loading.dismiss();
 });
 };

  //To edit ic with web
  webeditic(ic,name,email,phone,address, city, postcode, state, copyic,photo,suppaddr)
  {
   var dataRef = this.firestore.collection(this.approval);
   var check = this.firestore.collection(this.approval, ref=> ref.where("ic", "==", ic).where("status", "==", 'progress').where("type", "==", 'ic-edit'));
   this.loadingCtrl.create({
    spinner: 'circles',
    message: 'Please wait...',
    translucent: true,
  }).then(loading => {
    loading.present();
   check.get().subscribe( doc => {
      if(!doc.empty){
        this.alertservice.presentToast("You have submit edit identification cards already!!!")
      }else{
        
        //To add database
        let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
        dataRef.add({
          ic: ic,
          name: name,
          email: email,
          phone: phone,
          address: address,
          city: city,
          postcode: postcode,
          state: state,
          status: "progress",
          copyic : "",
          photo: "",
          suppaddress: "",
          type: "ic-edit",
          startdate: todaydate,
          statusdate: "",
          approveperson: "",
          completeperson: ""
        
      })
  
        //To upload copyic path
        var coic = `approval/editic/copyic/${new Date().getTime()}_${ic}`
        var courl = "";
        const fileRef = this.storage.ref(coic);
       
        //To upload photo path
        var uplphoto = `approval/editic/photo/${new Date().getTime()}_${'photo'}_${ic}`;
        var phurl = "";
        const fileRef3 = this.storage.ref(uplphoto);
  
        //To upload supporting document for address path
        var supappr = `approval/editic/supportingdocumentaddress/${new Date().getTime()}_${'suppaddr'}_${ic}`;
        var suurl = "";
        const fileRef4 = this.storage.ref(supappr);
  
        
        //To upload copyic 
        this.storage.upload(coic, copyic).snapshotChanges().pipe(
        finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              courl = url;
             
              // To get document id
              check.snapshotChanges().subscribe( set => {
                set.map(e => {
                  var id = e.payload.doc.id;
                  this.firestore.doc(this.approval + '/' + id).update({
                    copyic: courl
                  });
                })
              })            
            })
        })
      ).subscribe();

      //To upload photo path
      this.storage.upload(uplphoto, photo).snapshotChanges().pipe(
        finalize(() => {
            fileRef3.getDownloadURL().subscribe((url2) => {
              phurl = url2;
  
              // To get document id
              check.snapshotChanges().subscribe( set => {
                set.map(e => {
                  var id = e.payload.doc.id;
                  this.firestore.doc(this.approval + '/' + id).update({
                    photo: phurl
                  });
                });
              });          
            });
        })
      ).subscribe();

       //To upload supporting document for address path
       this.storage.upload(supappr, suppaddr).snapshotChanges().pipe(
        finalize(() => {
            fileRef4.getDownloadURL().subscribe((url3) => {
              suurl = url3;
  
              // To get document id
              check.snapshotChanges().subscribe( set => {
                set.map(e => {
                  var id = e.payload.doc.id;
                  this.firestore.doc(this.approval + '/' + id).update({
                    suppaddress: suurl
                  });
                });
              });           
            });
        })
      ).subscribe();
  
      
      this.alertservice.presentToast("The edit of identification cards is submitted!!!");
      this.router.navigate(['/tabs/more']);
      this.sendeditic(ic,name,address, city, state, postcode,email).subscribe();  
      
      }
      }, error => { // check ic error
        console.log(error);
      })
      
     
    loading.dismiss();
  });
  };

   //To edit ic with web
   mobileeditic(ic,name, email, phone,address, city, postcode, state, fcopyic, bcopyic, photo,suppaddr)
   {
    var dataRef = this.firestore.collection(this.approval);
    var check = this.firestore.collection(this.approval, ref=> ref.where("ic", "==", ic).where("status", "==", 'progress').where("type", "==", 'ic-edit'));
    this.loadingCtrl.create({
     spinner: 'circles',
     message: 'Please wait...',
     translucent: true,
   }).then(loading => {
     loading.present();
     check.get().subscribe( doc => {
       if(!doc.empty){
         this.alertservice.presentToast("You have submit edit identification cards already!!!")
       }else{
      
 
         //To add database
         let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
         dataRef.add({
           ic: ic,
           name: name,
           email: email,
           phone: phone,
           address: address,
           city: city,
           postcode: postcode,
           state: state,
           status: "progress",
           frontcopyic : "",
           backcopyic: "",
           photo: "",
           suppaddress: "",
           type: "ic-edit",
           startdate: todaydate,
           statusdate: "",
           approveperson: "",
           completeperson: ""
         
       })
   
           //To upload front copyic path
       var fcoic = `approval/editic/mobile/${new Date().getTime()}_${"front"}_${ic}`
       var fcourl = "";
       const fileRef = this.storage.ref(fcoic);

        //To upload front copyic path
        var bcoic = `approval/editic/mobile/${new Date().getTime()}_${"back"}_${ic}`
        var bcourl = "";
        const bc = this.storage.ref(bcoic);
        
         //To upload photo path
         var uplphoto = `approval/editic/photo/${new Date().getTime()}_${'photo'}_${ic}`;
         var phurl = "";
         const fileRef3 = this.storage.ref(uplphoto);
   
         //To upload supporting document for address path
         var supappr = `approval/editic/supportingdocumentaddress/${new Date().getTime()}_${'suppaddr'}_${ic}`;
         var suurl = "";
         const fileRef4 = this.storage.ref(supappr);
   
         
      //To upload frontcopyic 
      this.storage.upload(fcoic, fcopyic).snapshotChanges().pipe(
        finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              fcourl = url;
             
              // To get document id
              check.snapshotChanges().subscribe( set => {
                set.map(e => {
                  var id = e.payload.doc.id;
                  this.firestore.doc(this.approval + '/' + id).update({
                    frontcopyic: fcourl
                  });
                })
              })            
            })
        })
      ).subscribe();
 
       //To upload backcopyic 
       this.storage.upload(bcoic, bcopyic).snapshotChanges().pipe(
         finalize(() => {
             bc.getDownloadURL().subscribe((url) => {
               bcourl = url;
              
               // To get document id
               check.snapshotChanges().subscribe( set => {
                 set.map(e => {
                   var id = e.payload.doc.id;
                   this.firestore.doc(this.approval + '/' + id).update({
                     backcopyic: bcourl
                   });
                 })
               })            
             })
         })
       ).subscribe(); 
 
       //To upload photo path
       this.storage.upload(uplphoto, photo).snapshotChanges().pipe(
         finalize(() => {
             fileRef3.getDownloadURL().subscribe((url2) => {
               phurl = url2;
   
               // To get document id
               check.snapshotChanges().subscribe( set => {
                 set.map(e => {
                   var id = e.payload.doc.id;
                   this.firestore.doc(this.approval + '/' + id).update({
                     photo: phurl
                   });
                 });
               });          
             });
         })
       ).subscribe();
 
        //To upload supporting document for address path
        this.storage.upload(supappr, suppaddr).snapshotChanges().pipe(
         finalize(() => {
             fileRef4.getDownloadURL().subscribe((url3) => {
               suurl = url3;
   
               // To get document id
               check.snapshotChanges().subscribe( set => {
                 set.map(e => {
                   var id = e.payload.doc.id;
                   this.firestore.doc(this.approval + '/' + id).update({
                     suppaddress: suurl
                   });
                 });
               });           
             });
         })
       ).subscribe();
     
   
       this.alertservice.presentToast("The edit of identification cards is submitted!!!");
       this.router.navigate(['/tabs/more']);
       this.sendeditic(ic,name,address, city, state, postcode, email).subscribe();  
       
       }
       }, error => { // check ic error
         console.log(error);
       })
       
      
     loading.dismiss();
   });
   };

    //To register marry with web
   webregistermarry(manic,womanic,manname,womanname, manphoto, womanphoto,
    maniccopy,womaniccopy,manbirth, womanbirth,lettercopy, mandivorce, womandivorce, wmandeath, hwomandeath)
      {
       var dataRef = this.firestore.collection(this.approval);
       var getvalue = this.firestore.collection(this.login);
      var checkstatus = this.firestore.collection(this.marry);
      var checkman = this.firestore.collection(this.approval, ref=> ref.where("manic", "==", manic).where("status", "==", 'progress').where("type", "==", 'marry-register'));
      var checkwoman = this.firestore.collection(this.approval, ref=> ref.where("womanic", "==", womanic).where("status", "==", 'progress').where("type", "==", 'marry-register'));
      var checkboth = this.firestore.collection(this.approval, ref=> ref.where("manic", "==", manic).where("womanic", "==", womanic).where("status", "==", 'progress').where("type", "==", 'marry-register'));
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
       checkman.get().subscribe(doc=>{
        if (!doc.empty){
          this.alertservice.presentToast("Your registration of marriage is on progress!!! Please wait for the approval!!!")
        }else{
          checkwoman.get().subscribe(doc=>{
            if (!doc.empty){
              this.alertservice.presentToast("Your registration of marriage is on progress!!! Please wait for the approval!!!")
            }else{
                  
              checkstatus.ref.where("manic", "==" , manic).where("status", "==", "divorced").get().then(doc=>{
                if(!doc.empty){
                  this.alertservice.presentToast("The man must upload divorce certificate!!!")
                }else{
                  checkstatus.ref.where("womanic", "==" , womanic).where("status", "==", "divorced").get().then(doc=>{
                    if(!doc.empty){
                      this.alertservice.presentToast("The woman must upload divorce certificate!!!")
                    }else{
                      checkstatus.ref.where("manic", "==" , manic).where("status", "==", "windowed").get().then(doc=>{
                        if(!doc.empty){
                          this.alertservice.presentToast("The man must upload wife death certificate!!!")
                        }else{
                          checkstatus.ref.where("womanic", "==" , womanic).where("status", "==", "windowed").get().then(doc=>{
                            if(!doc.empty){
                              this.alertservice.presentToast("The woman must upload husband death certificate!!!")
                            }else{
                              getvalue.doc(manic).get().subscribe(doc=>{
                                var email = ""; 
                                var phone = "";
                                if(doc.data()["email"] == undefined || doc.data()["email"] ==null){
                                  email = "";
                                }else{
                                  email = doc.data()["email"];
                                }

                                if(doc.data()["phone"] == undefined || doc.data()["phone"] ==null){
                                  phone = "";
                                }else{
                                  phone = doc.data()["phone"];
                                }
                                //To add database
                                let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
                              dataRef.add({
                                manic: manic,
                                womanic: womanic,
                                manname: manname,
                                womanname: womanname,
                                manemail: email,
                                manphone: phone,
                                womanemail: "",
                                womanphone: "",
                                status: "progress",
                                mancopyic : "",
                                womancopyic: "",
                                manphoto: "",
                                womanphoto:"",
                                manbirthcertificate: "",
                                womanbirthcertificate: "",
                                mandivorce: "",
                                womandivorce: "",
                                manwifedeath: "",
                                letter:"",
                                womanhusbanddeath: "",
                                type: "marry-register",
                                startdate: todaydate,
                                statusdate: "",
                                approveperson: "",
                                completeperson: ""
                              })
                              getvalue.doc(manic).get().subscribe(doc=>{
                                var wemail = ""; 
                                var wphone = "";
                                if(doc.data()["email"] == undefined || doc.data()["email"] ==null){
                                  wemail = "";
                                }else{
                                  wemail = doc.data()["email"];
                                }

                                if(doc.data()["phone"] == undefined || doc.data()["phone"] ==null){
                                  wphone = "";
                                }else{
                                  wphone = doc.data()["phone"];
                                }
                               //To get document id
                                checkboth.snapshotChanges().subscribe( doc=> {
                                doc.map(e=>{
                                  var id = e.payload.doc.id;
                                  this.firestore.doc(this.approval + '/' + id).update({
                                  womanphone: wphone,
                                  womanemail: wemail
                                  });
                                })
                               })

                              })

                              
            //To upload mancopyic path
            var mancopyic = `approval/marry/mancopyic/${new Date().getTime()}_${manic}`;
            var maurl = "";
            const fileRef = this.storage.ref(mancopyic);

             //To upload mancopyic 
            this.storage.upload(mancopyic, maniccopy).snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  maurl = url;
      
                  // To get document id
                  checkboth.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        mancopyic: maurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();


            //To upload womancopyic path
            var womancopyic = `approval/marry/womancopyic/${new Date().getTime()}_${womanic}`;
            var wourl = "";
            const fileRef1 = this.storage.ref(womancopyic);

             //To upload womancopyic 
            this.storage.upload(womancopyic, womaniccopy).snapshotChanges().pipe(
            finalize(() => {
                fileRef1.getDownloadURL().subscribe((url) => {
                  wourl = url;
      
                  // To get document id
                  checkboth.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        womancopyic: wourl
                      });
                    })
                  })            
                })
            })
          ).subscribe();

             //To upload woman photo path
             var wphoto = `approval/marry/womanphoto/${new Date().getTime()}_${womanic}`;
             var wpurl = "";
             const fileRef2 = this.storage.ref(wphoto);
 
              //To upload womancopyic 
             this.storage.upload(wphoto, womanphoto).snapshotChanges().pipe(
             finalize(() => {
                 fileRef2.getDownloadURL().subscribe((url) => {
                   wpurl = url;
       
                   // To get document id
                   checkboth.snapshotChanges().subscribe( set => {
                     set.map(e => {
                       var id = e.payload.doc.id;
                       this.firestore.doc(this.approval + '/' + id).update({
                         womanphoto: wpurl
                       });
                     })
                   })            
                 })
             })
           ).subscribe();

             //To upload man photo path
             var mphoto = `approval/marry/manphoto/${new Date().getTime()}_${manic}`;
             var mpurl = "";
             const fileRef3 = this.storage.ref(mphoto);
 
              //To upload man photo
             this.storage.upload(mphoto, manphoto).snapshotChanges().pipe(
             finalize(() => {
                 fileRef3.getDownloadURL().subscribe((url) => {
                   mpurl = url;
       
                   // To get document id
                   checkboth.snapshotChanges().subscribe( set => {
                     set.map(e => {
                       var id = e.payload.doc.id;
                       this.firestore.doc(this.approval + '/' + id).update({
                         manphoto: mpurl
                       });
                     })
                   })            
                 })
             })
           ).subscribe();


           //To upload Surat Pengesahan Taraf Perkahwinan path
           var letter = `approval/marry/letter/${new Date().getTime()}_${manic}_${womanic}`;
           var leurl = "";
           const fileRef4 = this.storage.ref(letter);

            //To upload man photo
           this.storage.upload(letter, lettercopy).snapshotChanges().pipe(
           finalize(() => {
               fileRef4.getDownloadURL().subscribe((url) => {
                 leurl = url;
     
                 // To get document id
                 checkboth.snapshotChanges().subscribe( set => {
                   set.map(e => {
                     var id = e.payload.doc.id;
                     this.firestore.doc(this.approval + '/' + id).update({
                       letter: leurl
                     });
                   })
                 })            
               })
           })
         ).subscribe();

          //To upload Man Birth Certificate path
          var birthman = `approval/marry/manbirthcertificate/${new Date().getTime()}_${manic}`;
          var mburl = "";
          const fileRef5 = this.storage.ref(birthman);

           //To upload man birth certificate
          this.storage.upload(birthman, manbirth).snapshotChanges().pipe(
          finalize(() => {
              fileRef5.getDownloadURL().subscribe((url) => {
                mburl = url;
    
                // To get document id
                checkboth.snapshotChanges().subscribe( set => {
                  set.map(e => {
                    var id = e.payload.doc.id;
                    this.firestore.doc(this.approval + '/' + id).update({
                      manbirthcertificate: mburl
                    });
                  })
                })            
              })
          })
        ).subscribe();

        //To upload woMan Birth Certificate path
        var birthwoman = `approval/marry/womanbirthcertificate/${new Date().getTime()}_${womanic}`;
        var wburl = "";
        const fileRef6 = this.storage.ref(birthman);

         //To upload woman birth certificate
        this.storage.upload(birthwoman, womanbirth).snapshotChanges().pipe(
        finalize(() => {
            fileRef6.getDownloadURL().subscribe((url) => {
              wburl = url;
  
              // To get document id
              checkboth.snapshotChanges().subscribe( set => {
                set.map(e => {
                  var id = e.payload.doc.id;
                  this.firestore.doc(this.approval + '/' + id).update({
                    womanbirthcertificate: wburl
                  });
                })
              })            
            })
        })
      ).subscribe();

     
        if(mandivorce != ""){
        //To upload man Divorce Certificate path
        var divorceman = `approval/marry/mandivorcecertificate/${new Date().getTime()}_${manic}`;
        var mdurl = "";
        const fileRef7 = this.storage.ref(divorceman);
          
           //To upload mandivorcecertificate path
           this.storage.upload(divorceman, mandivorce).snapshotChanges().pipe(
            finalize(() => {
                fileRef7.getDownloadURL().subscribe((url3) => {
                  mdurl = url3;

                  // To get document id
                  checkboth.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        mandivorce: mdurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();
        } 


        if(wmandeath != ""){
          //To upload man wife death Certificate path
          var manwifedeath = `approval/marry/manwifedeathcertificate/${new Date().getTime()}_${manic}`;
          var mwdurl = "";
          const fileRef8 = this.storage.ref(divorceman);
            
             //To upload man wife death Certificate path
             this.storage.upload(manwifedeath, wmandeath).snapshotChanges().pipe(
              finalize(() => {
                  fileRef8.getDownloadURL().subscribe((url3) => {
                    mwdurl = url3;
  
                    // To get document id
                    checkboth.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          manwifedeath: mwdurl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();
          } 


          if(womandivorce != ""){
            //To upload woman Divorce Certificate path
            var divorcewoman = `approval/marry/womandivorcecertificate/${new Date().getTime()}_${womanic}`;
            var wdurl = "";
            const fileRef8 = this.storage.ref(divorcewoman);
              
               //To upload womandivorcecertificate path
               this.storage.upload(divorcewoman, womandivorce).snapshotChanges().pipe(
                finalize(() => {
                    fileRef8.getDownloadURL().subscribe((url3) => {
                      wdurl = url3;
    
                      // To get document id
                      checkboth.snapshotChanges().subscribe( set => {
                        set.map(e => {
                          var id = e.payload.doc.id;
                          this.firestore.doc(this.approval + '/' + id).update({
                            womandivorce: wdurl
                          });
                        })
                      })            
                    })
                })
              ).subscribe();
            } 
    
    
            if(hwomandeath != ""){
              //To upload woman husband death Certificate path
              var womanhusbanddeath = `approval/marry/womanhsubanddeathcertificate/${new Date().getTime()}_${womanic}`;
              var whdurl = "";
              const fileRef8 = this.storage.ref(divorceman);
                
                 //To upload woman husband death Certificate path
                 this.storage.upload(womanhusbanddeath, hwomandeath).snapshotChanges().pipe(
                  finalize(() => {
                      fileRef8.getDownloadURL().subscribe((url3) => {
                        whdurl = url3;
      
                        // To get document id
                        checkboth.snapshotChanges().subscribe( set => {
                          set.map(e => {
                            var id = e.payload.doc.id;
                            this.firestore.doc(this.approval + '/' + id).update({
                              womandeathdeath: whdurl
                            });
                          })
                        })            
                      })
                  })
                ).subscribe();
              } 
   
          checkboth.get().subscribe( doc=> {
            doc.docs.map(e=>{
              var manemail = e.data()["manemail"];
              var womanemail = e.data()["womanemail"];
              if(manemail != ""){
                this.sendregistermarry(manic, womanic, manname,  womanname, manemail).subscribe();  
              }
              if(womanemail != ""){
                this.sendregistermarry(manic, womanic, manname,  womanname, womanemail).subscribe();  
              }
              this.alertservice.presentToast("The register of marriage is submitted!!!");
              this.router.navigate(['/tabs/more']);
              
              
            })
          })
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
            
              })
            }
           })
        }
       })

    
        loading.dismiss();
      });
      }


  //To register marry with mobile
   mobileregistermarry(manic,womanic,manname,womanname, manphoto, womanphoto,
    fmaniccopy,fwomaniccopy,bmaniccopy,bwomaniccopy,manbirth, womanbirth,lettercopy, mandivorce, womandivorce, wmandeath, hwomandeath)
      {
       var dataRef = this.firestore.collection(this.approval);
       var getvalue = this.firestore.collection(this.login);
      var checkstatus = this.firestore.collection(this.marry);
      var checkman = this.firestore.collection(this.approval, ref=> ref.where("manic", "==", manic).where("status", "==", 'progress').where("type", "==", 'marry-register'));
      var checkwoman = this.firestore.collection(this.approval, ref=> ref.where("womanic", "==", womanic).where("status", "==", 'progress').where("type", "==", 'marry-register'));
      var checkboth = this.firestore.collection(this.approval, ref=> ref.where("manic", "==", manic).where("womanic", "==", womanic).where("status", "==", 'progress').where("type", "==", 'marry-register'));
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
       checkman.get().subscribe(doc=>{
        if (!doc.empty){
          this.alertservice.presentToast("Your registration of marriage is on progress!!! Please wait for the approval!!!")
        }else{
          checkwoman.get().subscribe(doc=>{
            if (!doc.empty){
              this.alertservice.presentToast("Your registration of marriage is on progress!!! Please wait for the approval!!!")
            }else{
             
				  checkstatus.ref.where("manic", "==" , manic).where("status", "==", "divorced").where("womanic", "==", womanic).get().then(doc=>{
                if (!doc.empty){
                  this.alertservice.presentToast("You need to go the recpectively JPN office to restore with your wife/husband relationship again!!!")
                }else{
				checkstatus.ref.where("manic", "==" , manic).where("status", "==", "divorced").get().then(doc=>{
                if(!doc.empty){
                  this.alertservice.presentToast("The man must upload divorce certificate!!!")
                }else{
                  checkstatus.ref.where("womanic", "==" , womanic).where("status", "==", "divorced").get().then(doc=>{
                    if(!doc.empty){
                      this.alertservice.presentToast("The woman must upload divorce certificate!!!")
                    }else{
                      checkstatus.ref.where("manic", "==" , manic).where("status", "==", "windowed").get().then(doc=>{
                        if(!doc.empty){
                          this.alertservice.presentToast("The man must upload wife death certificate!!!")
                        }else{
                          checkstatus.ref.where("womanic", "==" , womanic).where("status", "==", "windowed").get().then(doc=>{
                            if(!doc.empty){
                              this.alertservice.presentToast("The woman must upload husband death certificate!!!")
                            }else{
                              getvalue.doc(manic).get().subscribe(doc=>{
                                var email = ""; 
                                var phone = "";
                                if(doc.data()["email"] == undefined || doc.data()["email"] ==null){
                                  email = "";
                                }else{
                                  email = doc.data()["email"];
                                }

                                if(doc.data()["phone"] == undefined || doc.data()["phone"] ==null){
                                  phone = "";
                                }else{
                                  phone = doc.data()["phone"];
                                }
                                //To add database
                                let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
                              dataRef.add({
                                manic: manic,
                                womanic: womanic,
                                manname: manname,
                                womanname: womanname,
                                manemail: email,
                                manphone: phone,
                                womanemail: "",
                                womanphone: "",
                                status: "progress",
                                frontmancopyic : "",
                                frontwomancopyic: "",
                                backmancopyic : "",
                                backwomancopyic: "",
                                manphoto: "",
                                womanphoto:"",
                                manbirthcertificate: "",
                                womanbirthcertificate: "",
                                mandivorce: "",
                                womandivorce: "",
                                manwifedeath: "",
                                letter:"",
                                womanhusbanddeath: "",
                                type: "marry-register",
                                startdate: todaydate,
                                statusdate: "",
                                approveperson: "",
                                completeperson: ""
                              })
                              getvalue.doc(manic).get().subscribe(doc=>{
                                var wemail = ""; 
                                var wphone = "";
                                if(doc.data()["email"] == undefined || doc.data()["email"] ==null){
                                  wemail = "";
                                }else{
                                  wemail = doc.data()["email"];
                                }

                                if(doc.data()["phone"] == undefined || doc.data()["phone"] ==null){
                                  wphone = "";
                                }else{
                                  wphone = doc.data()["phone"];
                                }
                               //To get document id
                                checkboth.snapshotChanges().subscribe( doc=> {
                                doc.map(e=>{
                                  var id = e.payload.doc.id;
                                  this.firestore.doc(this.approval + '/' + id).update({
                                  womanphone: wphone,
                                  womanemail: wemail
                                  });
                                })
                               })

                              })

                              
            //To upload front mancopyic path
            var fmancopyic = `approval/marry/mobile/mancopyic/${new Date().getTime()}_${"front"}_${manic}`;
            var fmaurl = "";
            const fileRef = this.storage.ref(fmancopyic);

             //To upload front mancopyic 
            this.storage.upload(fmancopyic, fmaniccopy).snapshotChanges().pipe(
            finalize(() => {
                fileRef.getDownloadURL().subscribe((url) => {
                  fmaurl = url;
      
                  // To get document id
                  checkboth.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        frontmancopyic: fmaurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();

              //To upload back mancopyic path
              var bmancopyic = `approval/marry/mobile/mancopyic/${new Date().getTime()}_${"back"}_${manic}`;
            var fbmaurl = "";
            const bm = this.storage.ref(bmancopyic);

             //To upload front mancopyic 
            this.storage.upload(fbmaurl, bmaniccopy).snapshotChanges().pipe(
            finalize(() => {
                bm.getDownloadURL().subscribe((url) => {
                  fbmaurl = url;
      
                  // To get document id
                  checkboth.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        backmancopyic: fbmaurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();

            //To upload front womancopyic path
            var fwomancopyic = `approval/marry/mobile/womancopyic/${new Date().getTime()}_${"back"}_${womanic}`;
            var fwourl = "";
            const fileRef1 = this.storage.ref(fwomancopyic);

             //To upload front womancopyic 
            this.storage.upload(fwomancopyic, fwomaniccopy).snapshotChanges().pipe(
            finalize(() => {
                fileRef1.getDownloadURL().subscribe((url) => {
                  fwourl = url;
      
                  // To get document id
                  checkboth.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        frontwomancopyic: fwourl
                      });
                    })
                  })            
                })
            })
          ).subscribe();

          //To upload front womancopyic path
          var bwomancopyic = `approval/marry/mobile/womancopyic/${new Date().getTime()}_${"front"}_${womanic}`;
          var bwourl = "";
          const bw = this.storage.ref(bwomancopyic);

           //To upload front womancopyic 
          this.storage.upload(bwomancopyic, bwomaniccopy).snapshotChanges().pipe(
          finalize(() => {
              bw.getDownloadURL().subscribe((url) => {
                bwourl = url;
    
                // To get document id
                checkboth.snapshotChanges().subscribe( set => {
                  set.map(e => {
                    var id = e.payload.doc.id;
                    this.firestore.doc(this.approval + '/' + id).update({
                      backwomancopyic: bwourl
                    });
                  })
                })            
              })
          })
        ).subscribe();

             //To upload woman photo path
             var wphoto = `approval/marry/womanphoto/${new Date().getTime()}_${womanic}`;
             var wpurl = "";
             const fileRef2 = this.storage.ref(wphoto);
 
              //To upload womancopyic 
             this.storage.upload(wphoto, womanphoto).snapshotChanges().pipe(
             finalize(() => {
                 fileRef2.getDownloadURL().subscribe((url) => {
                   wpurl = url;
       
                   // To get document id
                   checkboth.snapshotChanges().subscribe( set => {
                     set.map(e => {
                       var id = e.payload.doc.id;
                       this.firestore.doc(this.approval + '/' + id).update({
                         womanphoto: wpurl
                       });
                     })
                   })            
                 })
             })
           ).subscribe();

             //To upload man photo path
             var mphoto = `approval/marry/manphoto/${new Date().getTime()}_${manic}`;
             var mpurl = "";
             const fileRef3 = this.storage.ref(mphoto);
 
              //To upload man photo
             this.storage.upload(mphoto, manphoto).snapshotChanges().pipe(
             finalize(() => {
                 fileRef3.getDownloadURL().subscribe((url) => {
                   mpurl = url;
       
                   // To get document id
                   checkboth.snapshotChanges().subscribe( set => {
                     set.map(e => {
                       var id = e.payload.doc.id;
                       this.firestore.doc(this.approval + '/' + id).update({
                         manphoto: mpurl
                       });
                     })
                   })            
                 })
             })
           ).subscribe();


           //To upload Surat Pengesahan Taraf Perkahwinan path
           var letter = `approval/marry/letter/${new Date().getTime()}_${manic}_${womanic}`;
           var leurl = "";
           const fileRef4 = this.storage.ref(letter);

            //To upload man photo
           this.storage.upload(letter, lettercopy).snapshotChanges().pipe(
           finalize(() => {
               fileRef4.getDownloadURL().subscribe((url) => {
                 leurl = url;
     
                 // To get document id
                 checkboth.snapshotChanges().subscribe( set => {
                   set.map(e => {
                     var id = e.payload.doc.id;
                     this.firestore.doc(this.approval + '/' + id).update({
                       letter: leurl
                     });
                   })
                 })            
               })
           })
         ).subscribe();

          //To upload Man Birth Certificate path
          var birthman = `approval/marry/manbirthcertificate/${new Date().getTime()}_${manic}`;
          var mburl = "";
          const fileRef5 = this.storage.ref(birthman);

           //To upload man birth certificate
          this.storage.upload(birthman, manbirth).snapshotChanges().pipe(
          finalize(() => {
              fileRef5.getDownloadURL().subscribe((url) => {
                mburl = url;
    
                // To get document id
                checkboth.snapshotChanges().subscribe( set => {
                  set.map(e => {
                    var id = e.payload.doc.id;
                    this.firestore.doc(this.approval + '/' + id).update({
                      manbirthcertificate: mburl
                    });
                  })
                })            
              })
          })
        ).subscribe();

        //To upload woMan Birth Certificate path
        var birthwoman = `approval/marry/womanbirthcertificate/${new Date().getTime()}_${womanic}`;
        var wburl = "";
        const fileRef6 = this.storage.ref(birthman);

         //To upload woman birth certificate
        this.storage.upload(birthwoman, womanbirth).snapshotChanges().pipe(
        finalize(() => {
            fileRef6.getDownloadURL().subscribe((url) => {
              wburl = url;
  
              // To get document id
              checkboth.snapshotChanges().subscribe( set => {
                set.map(e => {
                  var id = e.payload.doc.id;
                  this.firestore.doc(this.approval + '/' + id).update({
                    womanbirthcertificate: wburl
                  });
                })
              })            
            })
        })
      ).subscribe();

     
        if(mandivorce != ""){
        //To upload man Divorce Certificate path
        var divorceman = `approval/marry/mandivorcecertificate/${new Date().getTime()}_${manic}`;
        var mdurl = "";
        const fileRef7 = this.storage.ref(divorceman);
          
           //To upload mandivorcecertificate path
           this.storage.upload(divorceman, mandivorce).snapshotChanges().pipe(
            finalize(() => {
                fileRef7.getDownloadURL().subscribe((url3) => {
                  mdurl = url3;

                  // To get document id
                  checkboth.snapshotChanges().subscribe( set => {
                    set.map(e => {
                      var id = e.payload.doc.id;
                      this.firestore.doc(this.approval + '/' + id).update({
                        mandivorce: mdurl
                      });
                    })
                  })            
                })
            })
          ).subscribe();
        } 


        if(wmandeath != ""){
          //To upload man wife death Certificate path
          var manwifedeath = `approval/marry/manwifedeathcertificate/${new Date().getTime()}_${manic}`;
          var mwdurl = "";
          const fileRef8 = this.storage.ref(divorceman);
            
             //To upload man wife death Certificate path
             this.storage.upload(manwifedeath, wmandeath).snapshotChanges().pipe(
              finalize(() => {
                  fileRef8.getDownloadURL().subscribe((url3) => {
                    mwdurl = url3;
  
                    // To get document id
                    checkboth.snapshotChanges().subscribe( set => {
                      set.map(e => {
                        var id = e.payload.doc.id;
                        this.firestore.doc(this.approval + '/' + id).update({
                          manwifedeath: mwdurl
                        });
                      })
                    })            
                  })
              })
            ).subscribe();
          } 


          if(womandivorce != ""){
            //To upload woman Divorce Certificate path
            var divorcewoman = `approval/marry/womandivorcecertificate/${new Date().getTime()}_${womanic}`;
            var wdurl = "";
            const fileRef8 = this.storage.ref(divorcewoman);
              
               //To upload womandivorcecertificate path
               this.storage.upload(divorcewoman, womandivorce).snapshotChanges().pipe(
                finalize(() => {
                    fileRef8.getDownloadURL().subscribe((url3) => {
                      wdurl = url3;
    
                      // To get document id
                      checkboth.snapshotChanges().subscribe( set => {
                        set.map(e => {
                          var id = e.payload.doc.id;
                          this.firestore.doc(this.approval + '/' + id).update({
                            womandivorce: wdurl
                          });
                        })
                      })            
                    })
                })
              ).subscribe();
            } 
    
    
            if(hwomandeath != ""){
              //To upload woman husband death Certificate path
              var womanhusbanddeath = `approval/marry/womanhsubanddeathcertificate/${new Date().getTime()}_${womanic}`;
              var whdurl = "";
              const fileRef8 = this.storage.ref(divorceman);
                
                 //To upload woman husband death Certificate path
                 this.storage.upload(womanhusbanddeath, hwomandeath).snapshotChanges().pipe(
                  finalize(() => {
                      fileRef8.getDownloadURL().subscribe((url3) => {
                        whdurl = url3;
      
                        // To get document id
                        checkboth.snapshotChanges().subscribe( set => {
                          set.map(e => {
                            var id = e.payload.doc.id;
                            this.firestore.doc(this.approval + '/' + id).update({
                              womandeathdeath: whdurl
                            });
                          })
                        })            
                      })
                  })
                ).subscribe();
              } 
   
          checkboth.get().subscribe( doc=> {
            doc.docs.map(e=>{
              var manemail = e.data()["manemail"];
              var womanemail = e.data()["womanemail"];
              if(manemail != ""){
                this.sendregistermarry(manic, womanic, manname,  womanname, manemail).subscribe();  
              }
              if(womanemail != ""){
                this.sendregistermarry(manic, womanic, manname,  womanname, manemail).subscribe();  
              }
              this.alertservice.presentToast("The register of marriage is submitted!!!");
              this.router.navigate(['/tabs/more']);
              
              
            })
          })
                              })
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
				}
				})
            }
           })
        }
       })

    
        loading.dismiss();
      });
      }

    //Fail Apply Service
    failstatus(id,reason,type,email){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });   
      let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        this.firestore.doc(this.approval + '/' + id).set({
          failreason: reason 
        }, { merge: true });
        this.firestore.doc(this.approval + '/' + id).update({
          status: "fail" ,
          statusdate: todaydate
        });
        this.http.post(this.env.API_URL + 'api/sendfailapproval', {id:id ,reason:reason, type:type, email:email}, {headers:headers,observe: 'response'}).subscribe();
        this.alertservice.presentToast("You have successfully submit the approval flow process!!!");
        this.router.navigate(['/approval']);
        loading.dismiss();
      }); 
    }

    //Fail Apply Marry
    failmarrystatus(id,reason,type,manemail, womanemail){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });   
      let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        this.firestore.doc(this.approval + '/' + id).set({
          failreason: reason 
        }, { merge: true });
        this.firestore.doc(this.approval + '/' + id).update({
          status: "fail" ,
          statusdate: todaydate
        });
        if(manemail != "-"){
          this.http.post(this.env.API_URL + 'api/sendfailapproval', {reason:reason, type:type, email:manemail}, {headers:headers,observe: 'response'}).subscribe();
        }

        if(womanemail != "-"){
          this.http.post(this.env.API_URL + 'api/sendfailapproval', {reason:reason, type:type, email:womanemail}, {headers:headers,observe: 'response'}).subscribe();
        }
        
        this.alertservice.presentToast("You have successfully submit the approval flow process!!!");
        this.router.navigate(['/approval']);
        loading.dismiss();
      }); 
    }

    //To get marry certifcate number increment by database
    getmarrycertificate(){
      return this.firestore.collection(this.marry, ref=>ref.orderBy("marrycertificate", "desc").limit(1));  
    }

    //To get reference number increment by database
    getrefno(){
      return this.firestore.collection(this.approval, ref=>ref.orderBy("refno", "desc").limit(1));  
    }

    //To approve apply marriage
    approveregistermarry(id,type,marrycer,refno,staffname, manemail, womanemail){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
      
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        this.firestore.doc(this.approval + '/' + id).set({
          marrycertificate: marrycer,
          refno: refno
        }, { merge: true });
        this.firestore.doc(this.approval + '/' + id).update({
          status: "approve",
          approveperson: staffname,
          statusdate: todaydate
        });
         if(manemail != "-"){
          this.http.post(this.env.API_URL + 'api/sendapprovemarry', {marrycertificate:marrycer, refno: refno, type:type, email:manemail}, {headers:headers,observe: 'response'}).subscribe();
        }

        if(womanemail != "-"){
          this.http.post(this.env.API_URL + 'api/sendapprovemarry', {marrycertificate:marrycer, refno: refno, type:type, email:womanemail}, {headers:headers,observe: 'response'}).subscribe();
        }
        this.alertservice.presentToast("You have successfully submit the approval flow process!!!");
        this.router.navigate(['/approval']);
        loading.dismiss();
      }); 
    }

    //To approve edit ic and renew ic service
    approveboth(id,type,refno,staffname, email){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
      
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        this.firestore.doc(this.approval + '/' + id).set({
          refno: refno
        }, { merge: true });
        this.firestore.doc(this.approval + '/' + id).update({
          status: "approve",
          approveperson: staffname,
          statusdate: todaydate
        });
      
        this.http.post(this.env.API_URL + 'api/sendapproveboth', {refno: refno, type:type, email:email}, {headers:headers,observe: 'response'}).subscribe();
        this.alertservice.presentToast("You have successfully submit the approval flow process!!!");
        this.router.navigate(['/approval']);
        loading.dismiss();
      }); 
    }

    //To approve apply ic
    approveic(id,type,ic,refno,staffname, email){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
      var check = this.firestore.collection(this.profile).doc(ic);
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        check.get().subscribe(doc=>{
          if(doc.exists){
            this.alertservice.presentToast("You have entered similar identification card!!!")
          }else{
             this.firestore.doc(this.approval + '/' + id).set({
          refno: refno,
          ic:ic
        }, { merge: true });
        this.firestore.doc(this.approval + '/' + id).update({
          status: "approve",
          approveperson: staffname,
          statusdate: todaydate
        });
      
        this.http.post(this.env.API_URL + 'api/sendapproveic', {refno: refno, ic:ic, type:type, email:email}, {headers:headers,observe: 'response'}).subscribe();
        this.alertservice.presentToast("You have successfully submit the approval flow process!!!");
        this.router.navigate(['/approval']);
          }
        })
      
        loading.dismiss();
      }); 
    }

    //To apply birth certifcate service
    approvebirth(id,type,birth,refno,staffname, email){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
      var check = this.firestore.collection(this.children).doc(birth);
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        check.get().subscribe(doc=>{
          if(doc.exists){
            this.alertservice.presentToast("You have entered similar birth certificate!!!")
          }else{
             this.firestore.doc(this.approval + '/' + id).set({
          refno: refno,
          birthcertificate:birth
        }, { merge: true });
        this.firestore.doc(this.approval + '/' + id).update({
          status: "approve",
          approveperson: staffname,
          statusdate: todaydate
        });
      
        this.http.post(this.env.API_URL + 'api/sendapprovebirth', {refno: refno, birthcertificate:birth, type:type, email:email}, {headers:headers,observe: 'response'}).subscribe();
        this.alertservice.presentToast("You have successfully submit the approval flow process!!!");
        this.router.navigate(['/approval']);
          }
        })

       
        loading.dismiss();
      }); 
    }

    //To complete marriage certificate
    completemarry(id, type,staffname, manemail, womanemail){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
      var marry = this.firestore.collection(this.marry);
      var check = this.firestore.collection(this.approval).doc(id);
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        this.firestore.doc(this.approval + '/' + id).update({
          status: "complete",
          completeperson: staffname,
          statusdate: todaydate
        });

        check.get().subscribe(doc=>{
          marry.add({
            marrycertificate: doc.data()["marrycertificate"],
            manic: doc.data()["manic"],
            womanic: doc.data()["womanic"],
            status: "married"
          })
        })

        if(manemail != "-"){
          this.http.post(this.env.API_URL + 'api/sendcomplete', {type:type, email:manemail}, {headers:headers,observe: 'response'}).subscribe();
        }

        if(womanemail != "-"){
          this.http.post(this.env.API_URL + 'api/sendcomplete', {type:type, email:manemail}, {headers:headers,observe: 'response'}).subscribe();
        }
        
        this.alertservice.presentToast("You have successfully submit the approval flow process!!!");
        this.router.navigate(['/approval']);
        loading.dismiss();
      }); 
    }

    //To complete register ic service
    completeregic(id, type,staffname, email){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
      var profile = this.firestore.collection(this.profile);
      var child = this.firestore.collection(this.children);
      var check = this.firestore.collection(this.approval).doc(id);
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        this.firestore.doc(this.approval + '/' + id).update({
          status: "complete",
          completeperson: staffname,
          statusdate: todaydate
        });

        check.get().subscribe(doc=>{
        var ic = doc.data()["ic"];
        var birth = doc.data()["birthcertificate"];
        var religion= doc.data()["religion"];
        var race = doc.data()["race"];
        var name= doc.data()["name"];
        var address= doc.data()["address"];
        var state=  doc.data()["state"];
        var city =  doc.data()["city"];
        var postcode =  doc.data()["postcode"];
         child.doc(birth).get().subscribe(doc=>{
          var gender = doc.data()["gender"];
          var birthdate = doc.data()["birthdate"];
          profile.doc(ic).set
          ({
            religion: religion,
            race: race,
            name: name,
            address: address,
            state:  state,
            city:  city,
            postcode:  postcode,
            birthcertificate: birth,
            renew: "false",
            gender: gender, 
            birthdate:birthdate,
            picture: "" ,
          })
            child.doc(birth).update({
              ic : ic
            })
         })
        
        
        
        })

    
      this.http.post(this.env.API_URL + 'api/sendcomplete', {type:type, email:email}, {headers:headers,observe: 'response'}).subscribe();
        

       
        
        this.alertservice.presentToast("You have successfully submit the approval flow process!!!");
        this.router.navigate(['/approval']);
        loading.dismiss();
      }); 
    }


    //To complete register birth certificate
    completeregbirth(id, type,staffname, email){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
      var child = this.firestore.collection(this.children);
      var check = this.firestore.collection(this.approval).doc(id);
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        this.firestore.doc(this.approval + '/' + id).update({
          status: "complete",
          completeperson: staffname,
          statusdate: todaydate
        });

        check.get().subscribe(doc=>{
          var birth = doc.data()["birthcertificate"];
          child.doc(birth).set({
            fatheric: doc.data()["fatheric"],
            motheric: doc.data()["motheric"],
            gender: doc.data()["gender"],
            birthdate: doc.data()["birthdate"],
            name: doc.data()["name"]
          })
        
        
        
        })

    
      this.http.post(this.env.API_URL + 'api/sendcomplete', {type:type, email:email}, {headers:headers,observe: 'response'}).subscribe();
        

       
        
        this.alertservice.presentToast("You have successfully submit the approval flow process!!!");
        this.router.navigate(['/approval']);
        loading.dismiss();
      }); 
    }


    //To complete edit ic
    completeeditic(id, type,staffname, email){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
      var check = this.firestore.collection(this.approval).doc(id);
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        this.firestore.doc(this.approval + '/' + id).update({
          status: "complete",
          completeperson: staffname,
          statusdate: todaydate
        });

        check.get().subscribe(doc=>{
          var ic = doc.data()["ic"];
          this.firestore.doc(this.profile + '/' + ic).update({
            address: doc.data()["adress"],
            state: doc.data()["state"],
            city: doc.data()["city"],
            postcode: doc.data()["postcode"],
          })
        
        
        
        })

    
      this.http.post(this.env.API_URL + 'api/sendcomplete', {type:type, email:email}, {headers:headers,observe: 'response'}).subscribe();
        

       
        
        this.alertservice.presentToast("You have successfully submit the approval flow process!!!");
        this.router.navigate(['/approval']);
        loading.dismiss();
      }); 
    }

    //To complete renew ic service
    completerenewic(id, type,staffname, email){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
      let todaydate =this.datepipe.transform(Date.now(), 'dd-MM-yyyy');
      var check = this.firestore.collection(this.approval).doc(id);
      this.loadingCtrl.create({
        spinner: 'circles',
        message: 'Please wait...',
        translucent: true,
      }).then(loading => {
        loading.present();
        this.firestore.doc(this.approval + '/' + id).update({
          status: "complete",
          completeperson: staffname,
          statusdate: todaydate
        });

        check.get().subscribe(doc=>{
          var ic = doc.data()["ic"];
          this.firestore.doc(this.profile + '/' + ic).update({
            renew: "true"
          })
        
        
        
        })

    
      this.http.post(this.env.API_URL + 'api/sendcomplete', {type:type, email:email}, {headers:headers,observe: 'response'}).subscribe();
        

       
        
        this.alertservice.presentToast("You have successfully submit the approval flow process!!!");
        this.router.navigate(['/approval']);
        loading.dismiss();
      }); 
    }



//To read approval list show in the approval flow function
   read_approve_list(type, status){
     return this.firestore.collection(this.approval, ref=> ref.where("type", "==", type).where("status", "==", status)).snapshotChanges();
   };

   //To read details of approval flow
   read_details(id){
    return this.firestore.collection(this.approval).doc(id);
 };

    //To send email for approval birth certificate to the staff
  sendregisterbirth(mothername, fathername, name, email){
    let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });   
    return this.http.post(this.env.API_URL + 'api/sendregisterbirth', {mothername:mothername , fathername: fathername, name:name, email:email}, {headers:headers,observe: 'response'});
  };

     //To send email for approval ic to the staff
     sendregisteric(parentname, birth , name, email){
      let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });   
      return this.http.post(this.env.API_URL + 'api/sendregisteric', {parentname:parentname , birthcertificate: birth, name:name, email:email}, {headers:headers,observe: 'response'});
    };

      //To send email for approval renew ic to the staff
      sendrenewic(ic, name, email){
        let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });   
        return this.http.post(this.env.API_URL + 'api/sendrenewic', {ic:ic ,name:name, email:email}, {headers:headers,observe: 'response'});
      }; 
      
      //To send email for approval edit ic to the staff
      sendeditic(ic, name, address, city, state, postcode, email){
        let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });   
        return this.http.post(this.env.API_URL + 'api/sendeditic', {ic:ic ,name:name, address:address, city:city, postcode:postcode, state:state, email:email}, {headers:headers,observe: 'response'});
      };  
        //To send email for approval marry to the staff 
        sendregistermarry(manic, womanic, manname,  womanname, email){
          let headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });   
          return this.http.post(this.env.API_URL + 'api/sendregistermarry', {manic:manic, womanic:womanic, manname:manname, womanname:womanname, email:email}, {headers:headers,observe: 'response'});
        };  
        
    
}
