


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

```javascript
// in app.module.ts
import { NgValidations , NgValidationsModule } from 'ng2-validations';
  
@NgModule({
	...,
	imports: [
		...,
		NgValidationsModule
	],
	providers: [...
})
export class <yourAppModule> {
	constructor(private ngValidations: NgValidations){}
}
```


----------


### Configuring validators within your application

**Default Validators and Configuration**

The validation service relies on a JSON configuration file consisting of form control names and their associated validation properties.  A sample configuration file can be found [here](https://github.com/uspto/ng2-validations/blob/master/src/Samples/example-config.json) and ships with the service. The dynamic validations also require validator function definitions which can be found [here](https://github.com/uspto/ng2-validations/blob/master/src/Samples/sample-validation-definitions.ts). To use the default configuration and definitions in your application simply call the useDefaultConfig method in your app.module ngOnInit method.

```javascript
// in app.module.ts

export class <yourAppModule> {
  constructor(private ngValidations: NgValidations) {}
  
  ngOnInit() {
 		this.ngValidations.useDefaultConfig()
  }
}  
```
**Custom Validators and Configuration**

Ng2-Validations allows you to customize validations by creating your own configurations and/or validator definitions. 

 - To use a custom configuration create a new JSON configuration file with your control names and their applicable validations and conditions. In your application call the setValidatorConfiguration method and pass in your new JSON file.
 - For custom validator definitions create a new TS object with the definitions for each validator and an associated error message. Call the setValidatorDefinitions method and pass in your new definitions object.

 - ** **IMPORTANT** ** Make sure that any new configurations or definitions follow the same pattern as [these](https://github.com/uspto/ng2-validations/tree/master/src/Samples) examples. Deviating from this pattern will likely cause unexpected behavior and your validations may not be applied.

```javascript
// in app.module.ts
import { yourNewDefinitions } from '...path/to/yourDefinitions'
const yourNewConfig = require('...path/to/yourConfig.json');
  
export class <yourAppModule> {
	constructor(private ngValidations: NgValidations){}
	
	ngOnInit() {
	 	this.ngValidations.setValidatorConfiguration(yourNewConfig);
		this.ngValidations.setValidatorDefinitions(yourNewDefinitions);
  }
}
```
It is also possible to set your validator configuration or definitions from a source through a GET service call.

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

**Validator Messages in the HTML Template**


##### Examples for using in templates coming soon...
