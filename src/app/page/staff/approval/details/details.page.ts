import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { ProcessService } from 'src/app/service/process.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/service/auth.service';



@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  fail_form: FormGroup;
  approvalic_form:FormGroup;
  approvalbirth_form:FormGroup;
  type: string;
  staffname: string;
  marrycer: any;
  changemanumber: any; // for changing number
  refno: any;
  changerefno: any; // for changing number
  idtype: string;
  status: string;
  id: string;
  approvebirth: string;
  approveic: string;
  approvemarry: string;
  failreason:string;
  manemail: string; //Marry Man email
  womanemail: string; //Marry Woman email
  email: string;
  mantelno: string; //Marry Man Contact no
  womantelno: string;  //Marry woMan Contact no
  webic: any; //Webversion Copy IC
  fic: any; // Mobileversion Front Copy IC
  bic: any; //Mobileversion Back Copy IC
  ffaic: any; //Mobileversion Front Father Copy IC
  bfaic: any;//Mobileversion Back Father Copy IC
  fmoic: any; //Mobileversion Front Mother Copy IC
  bmoic: any;//Mobileversion Back Mother Copy IC
  faic: any;//Webversion Father Copy IC
  moic: any;//Webversion Mother Copy IC
  fmic: any; //Mobileversion Front Man Copy IC
  bmic: any;//Mobileversion Back Man Copy IC
  fwic: any; //Mobileversion Front Women Copy IC
  bwic: any;//Mobileversion Back Women Copy IC
  mic: any;//Webversion Man Copy IC
  wic: any;//Webversion Woman Copy IC
  dmcer: any;//Death Certificate For Mother
  dfcer: any;//Death Certificate For Father
  policereport: any //Birth At Home 
  manwifedeath: any;//Death Certificate For Man's Wife
  mandivorce: any;//Divorce Certificate For Man
  womanhusbanddeath: any;//Death Certificate For Woman's Husband
  womandivorce: any;//Divorce Certificate For Woman
  registerbirth = false;
  registeric = false;
  registermarry = false;
  renewic = false;
  editic = false;
  progress = false;
  approve = false;
  isFail = false;
  isAppregisteric = false;
  isAppregisterbirth = false;
  renic = [];
  edic =[];
  regic =[];
  regbir = [];
  regma = [];

  

  

  constructor(
    private route: ActivatedRoute,
    public iab: InAppBrowser,
    private platform: Platform,
    private processService: ProcessService,
    private storage: Storage,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
    private authservice: AuthService,
    
  ) { }
  
  ngOnInit() {
    this.idtype = this.route.snapshot.params.id;
    this.status = this.route.snapshot.params.id2;
    this.id = this.route.snapshot.params.id3;
    
    //To show the information in details page
    if(this.idtype == "ic-renew"){// Renew Indentification Card
      this.type = "Renew Identification Card";
      this.renewic =true;
      this.processService.read_details(this.id).snapshotChanges().subscribe(data => {
        this.renic = [];
        this.email = data.payload.data()['email'];
        this.webic = data.payload.data()['copyic'];
        this.fic = data.payload.data()['frontcopyic'];
        this.bic = data.payload.data()['backcopyic'];
        this.failreason = data.payload.data()['failreason'];
        if(this.failreason == null || this.failreason == "" || this.failreason == undefined){
          this.failreason = "-";
        }
        if(this.webic == null || this.webic == "" || this.webic == undefined){
          this.webic = "-";
        }
        if(this.fic == null || this.fic == "" || this.fic == undefined){
          this.fic = "-";
        }
        if(this.bic == null || this.bic == "" || this.bic == undefined){
          this.bic = "-";
        }

         var details = 
         {
           IC: data.payload.data()['ic'],
           EMAIL: this.email,
           NAME: data.payload.data()['name'].toUpperCase(),
           SUPPADDR: data.payload.data()['suppaddress'],
           STARTDATE: data.payload.data()['startdate'],
           STATUS: this.status,
           COPYIC: this.webic,
           FIC: this.fic,
           BIC: this.bic,
           TELNO: data.payload.data()["phone"],
           IMAGE: data.payload.data()["photo"],
           FAIL: this.failreason,
         };
        this.renic.push(details);
        
       });
    }else if(this.idtype == "ic-register"){ // Register Identification Card
      this.type = "Register Identification Card";
      this.registeric =true;
      this.processService.read_details(this.id).snapshotChanges().subscribe(data => {
        
        this.regic = [];
        
        this.email = data.payload.data()['email'];
        this.webic = data.payload.data()['parentcopyic'];
        this.fic = data.payload.data()['frontparentcopyic'];
        this.bic = data.payload.data()['backparentcopyic'];
        this.approveic = data.payload.data()['ic'];
        this.failreason = data.payload.data()['failreason'];
        if(this.failreason == null || this.failreason == "" || this.failreason == undefined){
          this.failreason = "-";
        }
        if(this.approveic == null || this.approveic == "" || this.approveic == undefined){
          this.approveic = "-";
        }
        if(this.webic == null || this.webic == "" || this.webic == undefined){
          this.webic = "-";
        }
        
        if(this.fic == null || this.fic == "" || this.fic == undefined){
          this.fic = "-";
        }
        
        if(this.bic == null || this.bic == "" || this.bic == undefined){
          this.bic = "-";
        }

         var details = 
         {
           PARENTNAME: data.payload.data()['parentname'].toUpperCase(),
           PARENTIC: data.payload.data()['parentic'],
           IC: this.approveic,
           EMAIL: this.email,
           BIRTHCER: data.payload.data()['birthcertificate'],
           RACE: data.payload.data()['race'],
           RELIGION: data.payload.data()['religion'],
           ADDRESS: data.payload.data()['address'],
           STATE: data.payload.data()['state'],
           CITY: data.payload.data()['city'],
           POSTCODE: data.payload.data()['postcode'],
           NAME: data.payload.data()['name'].toUpperCase(),
           BIRTHCERCOPY: data.payload.data()['birthcertificatecopy'],
           STARTDATE: data.payload.data()['startdate'],
           STATUS: this.status,
           FAIL: this.failreason,
           SUPPADDR: data.payload.data()['suppaddress'],
           TELNO: data.payload.data()["phone"],
           IMAGE: data.payload.data()["photo"],
           COPYIC: this.webic,
           FIC: this.fic,
           BIC: this.bic,
         };
        this.regic.push(details);
        
       });
    }else if(this.idtype == "ic-edit"){// Edit Indentification Card
      this.type = "Edit Identification Cards";
      this.editic =true;
      this.processService.read_details(this.id).snapshotChanges().subscribe(data => {
    
        this.edic = [];

        this.webic = data.payload.data()['copyic'];
        this.fic = data.payload.data()['frontcopyic'];
        this.bic = data.payload.data()['backcopyic'];
        this.failreason = data.payload.data()['failreason'];
        this.email = data.payload.data()['email'];
        
        if(this.failreason == null || this.failreason == "" || this.failreason == undefined){
          this.failreason = "-";
        }
       
        if(this.webic == null || this.webic == "" || this.webic == undefined){
          this.webic = "-";
        }
        
        if(this.fic == null || this.fic == "" || this.fic == undefined){
          this.fic = "-";
        }
        
        if(this.bic == null || this.bic == "" || this.bic == undefined){
          this.bic = "-";
        }
        

         var details = 
         {
           IC: data.payload.data()['ic'],
           EMAIL: this.email,
           ADDRESS: data.payload.data()['address'],
           STATE: data.payload.data()['state'],
           CITY: data.payload.data()['city'],
           POSTCODE: data.payload.data()['postcode'],
           NAME: data.payload.data()['name'].toUpperCase(),
           STARTDATE: data.payload.data()['startdate'],
           STATUS: this.status,
           FAIL: this.failreason,
           TELNO: data.payload.data()["phone"],
           IMAGE: data.payload.data()["photo"],
           COPYIC: this.webic,
           FIC: this.fic,
           BIC: this.bic,
         };
        this.edic.push(details);
        
       });
    }else if(this.idtype == "marry-register"){// Register Marriage
      this.type = "Register Marriage";
      this.registermarry =true;
      this.processService.read_details(this.id).snapshotChanges().subscribe(data => {
    
        this.regma = [];
        this.mic = data.payload.data()['mancopyic'];
        
        this.wic = data.payload.data()['womancopyic'];
        this.fmic = data.payload.data()['frontmancopyic'];
        this.bmic = data.payload.data()['backmancopyic'];
        this.bwic = data.payload.data()['backwomancopyic'];
        this.fwic = data.payload.data()['frontwomancopyic'];
        this.manemail = data.payload.data()["manemail"];
        this.womanemail = data.payload.data()["womanemail"];
        this.mantelno = data.payload.data()["manphone"];
        this.womantelno =data.payload.data()["womanphone"];
        this.manwifedeath = data.payload.data()["manwifedeath"];
        this.mandivorce= data.payload.data()["mandivorce"];
        this.womanhusbanddeath= data.payload.data()["womanhusbanddeath"];
        this.womandivorce = data.payload.data()["womandivorce"];
        this.failreason = data.payload.data()['failreason'];
        this.approvemarry = data.payload.data()['marrycertificate'];
        
        if(this.failreason == null || this.failreason == "" || this.failreason == undefined){
          this.failreason = "-";
        }
        if(this.manemail == ""){
          this.manemail = "-";
        };
        if(this.womanemail == ""){
          this.womanemail = "-";
        };
        if(this.womantelno == ""){
          this.womantelno = "-";
        };
        if(this.mantelno == ""){
          this.mantelno = "-";
        };
       
        if(this.manwifedeath == null || this.manwifedeath == "" || this.manwifedeath == undefined){
          this.manwifedeath = "-";
        }
        if( this.womandivorce == null ||  this.womandivorce == "" ||  this.womandivorce == undefined){
          this.womandivorce = "-";
        }
        if(this.mandivorce == null || this.mandivorce == "" || this.mandivorce == undefined){
          this.mandivorce = "-";
        }
        if(this.womanhusbanddeath == null || this.womanhusbanddeath == "" || this.womanhusbanddeath == undefined){
          this.womanhusbanddeath = "-";
        }
        if(this.mic == null || this.mic == "" || this.mic == undefined){
          this.mic = "-";
        }
        if( this.wic == null ||  this.wic == "" ||  this.wic == undefined){
          this.wic = "-";
        }
        if(this.fmic == null || this.fmic == "" || this.fmic == undefined){
          this.fmic = "-";
        }
        if(this.bmic == null || this.bmic == "" || this.bmic == undefined){
          this.bmic = "-";
        }
        if(this.fwic == null || this.fwic == "" || this.fwic == undefined){
          this.fwic = "-";
        }
        if(this.bwic == null || this.bwic == "" || this.bwic == undefined){
          this.bwic = "-";
        }
        if(this.approvemarry == ""|| this.approvemarry == "" || this.approvemarry == undefined){
          this.approvemarry = "-";
        };
        
        


         var details = 
         {
           MANNAME: data.payload.data()['manname'].toUpperCase(),
           WOMANNAME: data.payload.data()['womanname'].toUpperCase(),
           MANIC: data.payload.data()['manic'],
           WOMANIC: data.payload.data()['womanic'],
           MANEMAIL: this.manemail,
           WOMANEMAIL: this.womanemail,
           MARRYCER: this.approvemarry,
           WOMANTELNO: this.womantelno,
           MANTELNO: this.mantelno,
           MANWIFEDEATH: this.manwifedeath,
           MANDIVORCE: this.mandivorce,
           WOMANHUSBANDDEATH: this.womanhusbanddeath,
           W0MANDIVORCE: this.womandivorce,
           STARTDATE: data.payload.data()['startdate'],
           STATUS: this.status,
           LETTER: data.payload.data()['letter'],
           MANBIRTHCER: data.payload.data()['manbirthcertificate'],
           WOMANBIRTHCER: data.payload.data()['womanbirthcertificate'],
           MANIMAGE: data.payload.data()["manphoto"],
           WOMANIMAGE: data.payload.data()["womanphoto"],
           FAIL: this.failreason,
           MCOPYIC: this.mic,
           FCOPYIC: this.wic,
           FMIC: this.fmic,
           BMIC: this.bmic,
           FWIC: this.fwic,
           BWIC: this.bwic,
         };
        this.regma.push(details);
        
       });
    }else if(this.idtype == "birth-register"){ //Register Birth Certificate
      this.type = "Register Birth Certificate";
      this.registerbirth = true;
      this.processService.read_details(this.id).snapshotChanges().subscribe(data => {
    
        this.regbir = [];
        this.email = data.payload.data()['email'];
        this.faic = data.payload.data()['fathercopyic'];
        this.moic = data.payload.data()['mothercopyic'];
        this.ffaic = data.payload.data()['frontfathercopyic'];
        this.bfaic = data.payload.data()['backfathercopyic'];
        this.bmoic = data.payload.data()['backmothercopyic'];
        this.fmoic = data.payload.data()['frontmothercopyic'];
        this.dmcer = data.payload.data()[' motherdeathcertificate'];
        this.dfcer = data.payload.data()[' fatherdeathcertificate'];
        this.policereport = data.payload.data()['policereport'];
        this.failreason = data.payload.data()['failreason'];
        this.approvebirth = data.payload.data()['birthcertificate'];
        
        if(this.failreason == null || this.failreason == "" || this.failreason == undefined){
          this.failreason = "-";
        }
        if(this.dfcer == null || this.dfcer == "" || this.dfcer == undefined){
          this.dfcer = "-";
        }
        if(this.dmcer == null || this.dmcer == "" || this.dmcer == undefined){
          this.dmcer = "-";
        }
        if(this.faic == null || this.faic == "" || this.faic == undefined){
          this.faic = "-";
        }
        if( this.moic == null ||  this.moic == "" ||  this.moic == undefined){
          this.moic = "-";
        }
        if( this.ffaic == null ||  this.ffaic == "" ||  this.ffaic == undefined){
          this.ffaic = "-";
        }
        if( this.bfaic == null ||  this.bfaic == "" ||  this.bfaic == undefined){
          this.bfaic = "-";
        }
        if(this.bmoic == null || this.bmoic == "" || this.bmoic == undefined){
          this.bmoic = "-";
        }
        if(this.fmoic == null || this.fmoic == "" || this.fmoic == undefined){
          this.fmoic = "-";
        } 
        if(this.policereport == null || this.policereport == "" || this.policereport == undefined){
          this.policereport = "-";
        }
        if(this.approvebirth == ""|| this.approvebirth == "" || this.approvebirth == undefined){
          this.approvebirth = "-";
        };


         var details = 
         {
           MOTHERNAME: data.payload.data()['mothername'].toUpperCase(),
           FATHERNAME: data.payload.data()['fathername'].toUpperCase(),
           FATHERIC: data.payload.data()['fatheric'],
           MOTHERIC: data.payload.data()['motheric'],
           EMAIL: this.email,
           BIRTHDATE: data.payload.data()['birthdate'],
           BIRTHTIME: data.payload.data()['birthtime'],
           BIRTHCER: this.approvebirth,
           NAME: data.payload.data()['name'],
           POLICEREPORT: this.policereport,
           CARDLETTER: data.payload.data()['cardletter'],
           MOTHERDEATH: this.dmcer,
           FATHERDEATH: this.dfcer,
           MARRYCER: data.payload.data()['marrycertificate'],
           GENDER: data.payload.data()['gender'],
           STARTDATE: data.payload.data()['startdate'],
           STATE: data.payload.data()['state'],
           STATUS: this.status,
           DOCLETTER: data.payload.data()['doctorletter'],
           TELNO: data.payload.data()["phone"],
           FAIL: this.failreason,
           MCOPYIC: this.moic,
           FCOPYIC: this.faic,
           FFIC: this.ffaic,
           BFIC: this.bfaic,
           FMIC: this.fmoic,
           BMIC: this.bmoic,
         };
        this.regbir.push(details);
        
       });
    }

    if(this.status == "progress"){
      this.progress = true; 
    }else if(this.status == "approve"){
      this.approve = true;
    }

    this.processService.getmarrycertificate().get().subscribe(doc=>{
      if(doc.empty){
        this.marrycer = "1";
      }else{
        doc.docs.map(e=>{
        this.changemanumber = e.data()["marrycertificate"];
        this.marrycer = parseInt(this.changemanumber);
        this.marrycer = this.marrycer + 1;
        })
      }
    })

    this.processService.getrefno().get().subscribe(doc=>{
      if(doc.empty){
        this.refno = "1";
      }else{
        doc.docs.map(e=>{
        this.changerefno = e.data()["refno"];
        this.refno = parseInt(this.changerefno);
        this.refno = this.marrycer + 1;
        })
      }
    })

    //To take staff name
    this.storage.get('ic')
    .then((val) => {
     this.authservice.user(val).get().subscribe(doc => {
      this.staffname = doc.data()['name']
     })    
      
      error => console.error(error)
    });

    this.fail_form = this.formBuilder.group({
      note: new FormControl('', Validators.compose([
        Validators.required
      ])), 
    });

    this.approvalic_form = this.formBuilder.group({
      ic: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]+'),
        Validators.minLength(12),
        Validators.maxLength(12)
      ])),
    });


    this.approvalbirth_form = this.formBuilder.group({
      birth: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*$'),
        Validators.minLength(8),
        Validators.maxLength(8)
      ])),
    });

  }

  validation_messages = {
    'note': [
      { type: 'required', message: 'Reason is required.' },
    ],
      'ic': [
        { type: 'required', message: 'New NRIC No. is required.' },
        { type: 'pattern', message: 'Please enter numbers only' },
        { type: 'minlength', message: 'Please type 12 characters only' },
        { type: 'maxlength', message: 'Please type 12 characters only' }
      ],
      'birth': [
        { type: 'required', message: 'Birth Certificate Number is required.' },
        { type: 'pattern', message: 'Please enter numbers or characters only' },
        { type: 'minlength', message: 'Please type 8 characters only' },
        { type: 'maxlength', message: 'Please type 8 characters only' }
      ]
      
    };
  

  gotoPage(item){

    if (this.platform.is('cordova')) {
      this.iab.create(item, '_system', 'location=true');
    } else {
      this.iab.create(item, '_blank', 'location=true');
    }
  }

  gotoCitizen(item){
    var link = `http://localhost:8100/citizen/${item}`
    if (this.platform.is('cordova')) {
      this.iab.create(link, '_system', 'location=true');
    } else {
      this.iab.create(link, '_blank', 'location=true');
    }
  }

  gotoChild(item){
    var link = `http://localhost:8100/children-profile/${item}`
    if (this.platform.is('cordova')) {
      this.iab.create(link, '_system', 'location=true');
    } else {
      this.iab.create(link, '_blank', 'location=true');
    }
  }

  failpopup(){
    this.isFail = true;
  }
  
  async failapply(form: FormGroup){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'Are sure that you want to fail this apply service!!!',
       buttons: ['No', {
        text: 'Yes',
        handler: () => {
         if(this.idtype != "marry-register"){
          this.processService.failstatus(this.id, form.controls.note.value, this.type, this.email);
         }else{
          this.processService.failmarrystatus(this.id, form.controls.note.value, this.type, this.manemail, this.womanemail);
         }
          
        }
      }
    ]
    });

    await alert.present();
  }

  async approvepopup(){
    if(this.idtype == "ic-register"){
      this.isAppregisteric = true;
    }else if(this.idtype == "birth-register"){
      this.isAppregisterbirth = true;
    }else {
      const alert = await this.alertController.create({
        header: 'Warning?',
        message: 'Are sure that you want to approve this service!!!',
         buttons: ['No', {
          text: 'Yes',
          handler: () => {
           if(this.idtype == "marry-register"){
            this.processService.approveregistermarry(this.id, this.type, this.marrycer,this.refno,this.staffname, this.manemail, this.womanemail);
           }else{
            this.processService.approveboth(this.id, this.type,this.refno,this.staffname, this.email);
           }
      }
    }
      ]
      });
  
      await alert.present();
    }

  }

  async appric(form: FormGroup){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'Are sure that you want to approve this service!!!',
       buttons: ['No', {
        text: 'Yes',
        handler: () => {
         
          this.processService.approveic(this.id, this.type,form.controls.ic.value, this.refno,this.staffname, this.email);
         
    }
  }
    ]
    });

    await alert.present();
  }

  async apprbirth(form: FormGroup){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'Are sure that you want to approve this service!!!',
       buttons: ['No', {
        text: 'Yes',
        handler: () => {
         
          this.processService.approvebirth(this.id, this.type,form.controls.birth.value,this.refno,this.staffname, this.email);
         
    }
  }
    ]
    });

    await alert.present();
  }


  async completepopup(){
    const alert = await this.alertController.create({
      header: 'Warning?',
      message: 'Are sure that you want to approve this service!!!',
       buttons: ['No', {
        text: 'Yes',
        handler: () => {
          if(this.idtype == "marry-register"){
            this.processService.completemarry(this.id, this.type,this.staffname, this.manemail, this.womanemail);
          }else if (this.idtype == "ic-register"){
            this.processService.completeregic(this.id, this.type,this.staffname, this.email);
          }else if (this.idtype == "ic-edit"){
            this.processService.completeeditic(this.id, this.type,this.staffname, this.email);
          }else if(this.idtype == "ic-renew"){
            this.processService.completerenewic(this.id, this.type,this.staffname, this.email);
          }else if(this.idtype == "birth-register"){
            this.processService.completeregbirth(this.id, this.type,this.staffname, this.email);
          }
  
         
  } 
  }
    ]
    });

    await alert.present();
  }

}
