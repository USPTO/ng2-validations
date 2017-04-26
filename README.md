# Ng2-Validations
FPNG service designed to make validations on Angular 2 forms easy.


----------
### Getting Started

**Install**

    npm install "git+https://git@github.com/uspto/ng2-validations.git"

**Import into Application**

 - Import NgValidationsModule and NgValidations from ng2-validations
 - Add NgValidationsModule to your NgModel imports, preferably at the root level of your application
 - Inject NgValidations into your app module constructor 
 - Ng2-Validations uses Angular's FormsModule, ReactiveFormsModule, and FormBuilder so be sure to import those as well

```javascript
// in app.module.ts
import { NgValidations , NgValidationsModule } from 'ng2-validations';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms'
  
@NgModule({
	...,
	imports: [
		...,
		NgValidationsModule,
        FormsModule,
        ReactiveFormsModule
	],
	providers: [ FormBuilder, ...
})
export class <yourAppModule> {
	constructor(private ngValidations: NgValidations){}
}
```


----------


### Configuring validators within your application

**Default Validators and Configuration**

The validation service relies on a configuration file in either a TS or JSON object consisting of form control names and their associated validation properties.  A sample configuration file can be found [here](https://github.com/USPTO/ng2-validations/blob/master/src/Default/defaultConfig.ts) and ships with the service. The dynamic validations also require validator function definitions which can be found [here](https://github.com/USPTO/ng2-validations/blob/master/src/Default/defaultDefinitions.ts). The default configuration and definitions are available to your application, no need to modify anything. As we are still actively developing and testing this service, more common validations will be added to the configuation and definitions files soon. Stay tuned...

** **NOTE** ** Previously, using the default values required calling NgValidations.useDefaultConfig() somewhere in the application. This is no longer necessary as the default settings will automacially be applied unless overridden. 


**Custom Validators and Configuration**

Ng2-Validations allows you to customize validations by creating your own configurations and/or validator definitions.

****Adding to or Modifying existing definitionstions/configuration****

If your application calls for adding to or modifying only part of the default validators it is best to use the update methods on NgValidations.
 - To add to or modify the configuration create a new TS object with the control name(s) and associated validators and conditions. Pass the object to updateValidatorConfig() method. Each control has 3 optional properties: required, conditions, and validators.These properties will default to false or [];
 - To add to or modify the definitions create a new TS object with one or more definitions in the proper format and pass it to the updateValidatorDefinitions method.
 - You can also update both the configuration and definitions by calling updateDefinitionsAndConfig. This method takes two parameters: A definitions object and a configuration object.
 - If you only want to change a message on one or more validators call updateValidatorMessages. This method expects an object whose keys match up to the definitions that you want to modify and their associated messages. 
 -  ** **IMPORTANT** ** Ng2Validations matches form controls to the keys in the configuration object. Therefore, the keys must be the same as your form control names.


```javascript
// in your app.module or component.ts
export class <yourClass> {
	constructor(private ngValidations: NgValidations){}
	
	ngOnInit() {
        let addConfig = { 
        		passwordTwo: {
        			validators: ['passwordVal'],
                    conditions:[],
                    required: true
        		} 
        	}
    	let addDef = {
        		passwordVal: {
            		passwordVal: function(c: FormControl) {
                		// Do some validation...
                	}
                	message: 'your message'
            	}
        	}
        
        // Update config
        this.ngValidations.updateValidatorConfig(addConfig)
        // Update definitions
        this.ngValidations.updateValidatorDefinitions(addDef);
        // Or do both
        this.ngValidations.updateDefinitionsAndConfig(addDef, addConfig);
        
        // Update validator messages
        this.ngValidations.updateValidatorMessages({
        	passwordVal: 'your new message for passwordVal definition',
            someOtherDef: 'your new message for someOtherDef definition'
        })
        
  	}
}

``` 

 ****Replacing Default Definitions and/or Configuration****
 
 If you want to replace the entire default validator configuration and/or definitions with your own: 
 - Create a new TS or JSON configuration file with your control names and their applicable validations and conditions. In your application call the setValidatorConfiguration method and pass in your new file.
 - For custom validator definitions create a new TS object with the definitions for each validator and an associated error message. Call the setValidatorDefinitions method and pass in your new definitions object.

 - ** **IMPORTANT** ** Make sure that any new configurations or definitions follow the same pattern as [these](https://github.com/uspto/ng2-validations/tree/master/src/Default) examples. Remeber, the keys must be the same as your form control names. Deviating from this pattern will likely cause unexpected behavior and your validations may not be applied.

```javascript
// in app.module.ts
import { yourNewDefinitions } from '...path/to/yourDefinitions'
// Either
import { yourNewConfig } from '...path/to/yourConfig';
// Or
const yourNewConfig = require('...path/to/yourConfig.json');
  
export class <yourAppModule> {
	constructor(private ngValidations: NgValidations){}
	
	ngOnInit() {
	 	this.ngValidations.setValidatorConfiguration(yourNewConfig);
		this.ngValidations.setValidatorDefinitions(yourNewDefinitions);
  }
}
```
It is also possible to override your validator configuration and/or definitions from a source through a GET service call.

 -  To retrieve custom configurations call setConfigurationFromSource and pass in your source URL.  This method expects a JSON configuration file to be returned and will apply the new data to its validations.
 - To retrieve custom definitions call setDefinitionsFromSource and pass in your source URL. This method also expects a JSON object consisting of your new validator definitions and error messages of the same pattern as [these](https://github.com/uspto/ng2-validations/blob/master/src/Samples/sample-validation-definitions.ts) .
 - ** **IMPORTANT** ** Since the service call is asynchronous make sure to block the rendering of any routes that use ng2-validations until the calls are successfully completed or your validations will not be applied.

```javascript
// in app.module.ts
  
export class <yourAppModule> {
	constructor(private ngValidations: NgValidations){}
	
	ngOnInit() {
	 	this.ngValidations.setConfigurationFromSource('sourceUrl');
		this.ngValidations.setDefinitionsFromSource('sourceUrl');
  }
}

// Remember to block the rendering of any routes consuming this service until after its successful completion!
```

----------

### Using ng2-validations in your components
**Applying Validations to Your Forms**

Applying validations to your forms can be accomplished by calling one method, bindFormValidations. This method returns an object with two keys:
 -  messages: An array of validators and their error messages.
 -  controls: An array of form controls associated with your form.
  
You can loop through these arrays in your html template to notify the user of the validity of your forms inputs. To use this method:

 - Create a form using Angular's FormBuilder and pass the FormGroup into bindFormValidations.
 - Create a private array property on your component class to hold the returned validation messages.
 - If you have multiple FormGroups pass each one into bindFormValidations separately. Add the returned messages to your validators array.
 - To ensure the validations remain correctly applied to each form control it is best to bundle the creation of each FormGroup into one createForm method and call this method on ngOnInit. Instead of using angular's native reset() method on the form call createForm again to reset it's values and apply the validations.

**One Form Group** 

```javascript
// your-component.ts
  
export class <yourComponent> {

	private validators //<= Array of validators for html template
	private sampleForm: FormGroup; 

	constructor(private ngValidations: NgValidations, private fb: FormBuildier){}
	
	ngOnInit() {
	 	this.createForm();
    }
	
	createForm() {
		//Create the form
		this.sampleForm = this.fb.group({
			'username': [''],
			'password': [''],
			'email': ['']
		})
		//Apply validations and get validator messages
		this.validators = this.ngValidations.bindFormValidations(this.sampleForm).messages;
	}
	
	// Use this to reset a form bound to dynamic validations
	reset() {
		this.createForm()
	}
}
```

 **Multiple Form Groups** 

```javascript
// your-component.ts
  
export class <yourComponent> {

	private validators //<= Array of validators for html template
	private controls:Array<any> = []; // Array of controls
	private sampleForm: FormGroup;
	private passwordGroup:FormGroup;
	
	constructor(private ngValidations: NgValidations, private fb: FormBuildier){}
	
	ngOnInit() {
	 	this.createForm();
    }
	
	createForm() {
		//Create the nested FormGroup
		this.passwordGroup = this.fb.group({
			'passwordOne': [],
			'passwordTwo': []
		})
		
		//Create main FormGroup
		this.sampleForm = this.fb.group({
			'username': [''],
			'password': this.passwordGroup,
			'email': ['']
		})

		//Use temp variable to apply validations and get validator messages
		let tempCtr1 = this.ngValidations.bindFormValidations(this.sampleForm);
		let tempCtr2 = this.ngValidations.bindFormValidations(this.passwordGroup);
		
		// Add controls and messages
		this.controls = [...tempCtr1.controls, ...tempCtr2.controls];
			// The messages only need to be returned once because the 
			// bindFormValidations method returns all possible validators
		this.validators = [...tempCtrl1.messages]
		
		
	}
	
	// Use this to reset a form bound to dynamic validations
	reset() {
		this.createForm()
	}
}
```

### Validator Messages in the HTML Template ###

Each validation definition is constructed as an object with two properties: A function and a message.  Angular Form's native validation methods will return any errors for a form control with the name of the function producing the failure.  These messages can be dynamically displayed in the HTML template by using  *ngFor  to loop through the validator's array for each form control. If the control has an error display the associated message with the *ngIf directive:  *ngIf="yourControl.hasError(validator.name)". Here, validator.name refers to the function key in the validator's definition object. 


   **Simple HTML Template**

   This example uses abstract controls 'username', 'passwordOne', 'passwordTwo', and 'passwordGroup'
    
    
    <form>
    
		<label>Username</label>
		<input 
			class="form-control" placeholder="Username"
		    [class.error]='username._touched && username.invalid'
		    [formControl]='username'
		 >
		 <div *ngIf='username._touched && username.invalid'>
		    <div *ngFor='let validator of validators'>
			    <p class='error-msg'
				    *ngIf='username.hasError(validator.name)'
			    >
				    {{validator.message}}
			    </p>
		    </div>
		</div>
		
		<label>Password</label>
		<input 
			class="form-control" placeholder="Password"
		    [class.error]='passwordOne._touched && passwordOne.invalid'
		    [formControl]='passwordOne'
		 >
		 <div *ngIf='passwordOne._touched && passwordOne.invalid'>
		    <div *ngFor='let validator of validators'>
			    <p class='error-msg'
				    *ngIf='passwordOne.hasError(validator.name)'
			    >
				    {{validator.message}}
			    </p>
		    </div>
		</div>
		
		<label>Confirm Password</label>
		<input 
			class="form-control" placeholder="Confirm"
		    [class.error]='passwordTwo._touched && passwordTwo.invalid'
		    [formControl]='passwordTwo'
		 >
		 <div *ngIf='passwordTwo._touched && passwordTwo.invalid'>
		    <div *ngFor='let validator of validators'>
			    <p class='error-msg'
				    *ngIf='passwordTwo.hasError(validator.name)'
			    >
				    {{validator.message}}
			    </p>
		    </div>
		</div>
    
    	<div *ngIf='passwordOne._touched && passwordTwo._touched && passwordGroup.invalid'>
			<div *ngFor='let validator of validators'>
			    <p class='error-msg'
				    *ngIf='passwordGroup.hasError(validator.name)'
			    >
				    {{validator.message}}
			    </p>
		    </div>
		</div>
		
	</form>	    


#####Example for using the controls array in HTML coming soon...

### License

Software code created by U.S. Government employees is not subject to copyright in the United States (17 U.S.C. §105). The United States/Department of Commerce reserve all rights to seek and obtain copyright protection in countries other than the United States for Software authored in its entirety by the Department of Commerce. To this end, the Department of Commerce hereby grants to Recipient a royalty-free, nonexclusive license to use, copy, and create derivative works of the Software outside of the United States.

###  **Other Information**

The United States Department of Commerce (DOC)and the United States Patent and Trademark Office (USPTO) GitHub project code is provided on an ‘as is’ basis without any warranty of any kind, either expressed, implied or statutory, including but not limited to any warranty that the subject software will conform to specifications, any implied warranties of merchantability, fitness for a particular purpose, or freedom from infringement, or any warranty that the documentation, if provided, will conform to the subject software. DOC and USPTO disclaim all warranties and liabilities regarding third party software, if present in the original software, and distribute it as is. The user or recipient assumes responsibility for its use. DOC and USPTO have relinquished control of the information and no longer have responsibility to protect the integrity, confidentiality, or availability of the information.

User and recipient agree to waive any and all claims against the United States Government, its contractors and subcontractors as well as any prior recipient, if any. If user or recipient’s use of the subject software results in any liabilities, demands, damages, expenses or losses arising from such use, including any damages from products based on, or resulting from recipient’s use of the subject software, user or recipient shall indemnify and hold harmless the United States government, its contractors and subcontractors as well as any prior recipient, if any, to the extent permitted by law. User or recipient’s sole remedy for any such matter shall be immediate termination of the agreement. This agreement shall be subject to United States federal law for all purposes including but not limited to the validity of the readme or license files, the meaning of the provisions and rights and the obligations and remedies of the parties. Any claims against DOC or USPTO stemming from the use of its GitHub project will be governed by all applicable Federal law. “User” or “Recipient” means anyone who acquires or utilizes the subject code, including all contributors. “Contributors” means any entity that makes a modification.

This agreement or any reference to specific commercial products, processes, or services by service mark, trademark, manufacturer, or otherwise, does not in any manner constitute or imply their endorsement, recommendation or favoring by DOC or the USPTO, nor does it constitute an endorsement by DOC or USPTO or any prior recipient of any results, resulting designs, hardware, software products or any other applications resulting from the use of the subject software. The Department of Commerce seal and logo, or the seal and logo of a DOC bureau, including USPTO, shall not be used in any manner to imply endorsement of any commercial product or activity by DOC, USPTO or the United States Government.



![Public Domain](https://camo.githubusercontent.com/c5160f944848828fa33126d9a697e9abe43ea98f/687474703a2f2f692e6372656174697665636f6d6d6f6e732e6f72672f702f7a65726f2f312e302f38387833312e706e67)
	To the extent possible under law, https://github.com/USPTO/ng2-validations has waived all copyright and related or neighboring rights to ng2-validations This work is published from: United States.