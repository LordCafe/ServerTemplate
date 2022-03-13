import React from "react";
import ReactDOM from "react-dom";
let lazy = true;
window.GlobalConfigCopilator = window.GlobalConfigCopilator || {};
function CreateCompilationInfo(namefile = false) {
	let ReactCompilation = window.ReactCompilation || {}
	ReactCompilation = {
		Version: VERSION,
		BuildTime: new Date(BUILDTIME),
		NameFiles: ReactCompilation.NameFiles || [],
		ComponentesRender: window.GlobalConfigCopilator || [],
	}
	if (namefile) {
		ReactCompilation.NameFiles.push(namefile);
	}
	window.ReactCompilation = ReactCompilation;
}


function CreateOneComponent({ IdDom, data, Component, NoLazy = false }, ComponentName) {
	let target = document.getElementById(IdDom);

	window.GlobalConfigCopilator[ComponentName] = { idTarget: IdDom, work: false }
	if (target) {
		let WithLazy = (NoLazy == false) ? <Component  {...data} /> : <Component  {...data} />;
		SaveCreation(WithLazy, target);
		window.GlobalConfigCopilator[ComponentName].work = true;

	} else {
		console.warn("%c El componente "
		+ ComponentName, "background:black; color: white",
		"No pudo encontrar su id ancla  " + IdDom);
	}
}

function CreateOneComponentNoTLazy({ IdDom, data, Component }, ComponentName) {
	let target = document.getElementById(IdDom);
	GlobalConfigCopilator[ComponentName] = { idTarget: IdDom, work: false }
	if (target) {
		console.log("%c El componente " + ComponentName + " se insertara en el html", "background:white; color: green");
		let dataComponent = <Component  {...data} />;
		SaveCreation(dataComponent, target);
		GlobalConfigCopilator[ComponentName].work = true;
	} else {
		console.warn("%c El componente " + ComponentName, "background:black; color: white", "No pudo encontrar su id ancla  " + IdDom);
	}
}

function SaveCreation(Component, Target) {
	try {
		ReactDOM.render(Component, Target);
	} catch (error) {
		console.log(  Component ,Target );
		console.log(error);

	}
}

function InsertComponentsByConfig(Config, LazyLoad) {
	let LazyLoad1 = (typeof LazyLoad == 'undefined') ? true : LazyLoad;
	//Toda la configuracion en array
	let configForRender = Object.entries(Config);
	configForRender.forEach((ConfigReact, index) => {
		let [ComponentName, config] = ConfigReact;
		if (LazyLoad1) {
			CreateOneComponent(config, ComponentName);
		} else {
			CreateOneComponentNoTLazy(config, ComponentName);
		}

	});
}

export { InsertComponentsByConfig, CreateCompilationInfo };
