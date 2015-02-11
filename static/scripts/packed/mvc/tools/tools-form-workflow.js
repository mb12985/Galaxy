define(["utils/utils","mvc/tools/tools-form-base"],function(b,a){var c=a.extend({initialize:function(e){this.node=workflow.active_node;if(!this.node){console.debug("FAILED - tools-form-workflow:initialize() - Node not found in workflow.");return}this.post_job_actions=this.node.post_job_actions||{};this.options=e;this.options.text_enable="In Advance";this.options.text_disable="At Runtime";this.options.is_dynamic=false;this.options.narrow=true;this.options.initial_errors=true;this.options.cls_portlet="ui-portlet-narrow";b.deepeach(e.inputs,function(f){if(f.type){f.optional=(["data","data_hidden","hidden","drill_down","repeat","conditional"]).indexOf(f.type)==-1}});b.deepeach(e.inputs,function(f){if(f.type){if(f.type=="conditional"){f.test_param.optional=false}}});var d=this;b.get({url:galaxy_config.root+"api/datatypes",cache:true,success:function(f){d.datatypes=f;d._makeSections(e.inputs);a.prototype.initialize.call(d,e)}})},_makeSections:function(d){d[b.uuid()]={label:"Annotation / Notes",name:"annotation",type:"text",area:true,help:"Add an annotation or note for this step. It will be shown with the workflow.",value:this.node.annotation};var f=this.node.output_terminals&&Object.keys(this.node.output_terminals)[0];if(f){d[b.uuid()]={name:"pja__"+f+"__EmailAction",label:"Email notification",type:"boolean",value:String(Boolean(this.post_job_actions["EmailAction"+f])),ignore:"false",help:"An email notification will be send when the job has completed.",payload:{host:window.location.host}};d[b.uuid()]={name:"pja__"+f+"__DeleteIntermediatesAction",label:"Output cleanup",type:"boolean",value:String(Boolean(this.post_job_actions["DeleteIntermediatesAction"+f])),ignore:"false",help:"Delete intermediate outputs if they are not used as input for another job."};for(var e in this.node.output_terminals){d[b.uuid()]=this._makeSection(e)}}},_makeSection:function(h){var g=[];for(key in this.datatypes){g.push({0:this.datatypes[key],1:this.datatypes[key]})}g.sort(function(j,i){return j.label>i.label?1:j.label<i.label?-1:0});g.unshift({0:"Sequences",1:"Sequences"});g.unshift({0:"Roadmaps",1:"Roadmaps"});g.unshift({0:"Leave unchanged",1:""});var f={label:"Add Actions: '"+h+"'",type:"section",inputs:[{action:"RenameDatasetAction",argument:"newname",label:"Rename dataset",type:"text",value:"",ignore:"",help:'This action will rename the result dataset. Click <a href="https://wiki.galaxyproject.org/Learn/AdvancedWorkflow/Variables">here</a> for more information.'},{action:"ChangeDatatypeAction",argument:"newtype",label:"Change datatype",type:"select",ignore:"",options:g,help:"This action will change the datatype of the output to the indicated value."},{action:"TagDatasetAction",argument:"tags",label:"Tags",type:"text",value:"",ignore:"",help:"This action will set tags for the dataset."},{label:"Assign columns",type:"section",inputs:[{action:"ColumnSetAction",argument:"chromCol",label:"Chrom column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",argument:"startCol",label:"Start column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",argument:"endCol",label:"End column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",argument:"strandCol",label:"Strand column",type:"integer",value:"",ignore:""},{action:"ColumnSetAction",argument:"nameCol",label:"Name column",type:"integer",value:"",ignore:""}],help:"This action will set column assignments in the output dataset. Blank fields are ignored."}]};var d=this;function e(n,o){o=o||[];o.push(n);for(var m in n.inputs){var k=n.inputs[m];if(k.action){k.name="pja__"+h+"__"+k.action;if(k.argument){k.name+="__"+k.argument}if(k.payload){for(var s in k.payload){var q=k.payload[s];k.payload[k.name+"__"+s]=q;delete q}}var r=d.post_job_actions[k.action+h];if(r){for(var l in o){o[l].expand=true}if(k.argument){k.value=r.action_arguments&&r.action_arguments[k.argument]||k.value}else{k.value="true"}}}if(k.inputs){e(k,o.slice(0))}}}e(f);return f},_buildModel:function(){Galaxy.modal.show({title:"Coming soon...",body:"This feature has not been implemented yet.",buttons:{Close:function(){Galaxy.modal.hide()}}})},_updateModel:function(){var d=this;var e={tool_id:this.options.id,tool_version:this.options.version,inputs:this.tree.finalize()};console.debug("tools-form-workflow::_refreshForm() - Refreshing states.");console.debug(e);var g=this.deferred.register();var f=galaxy_config.root+"api/workflows/build_module";b.request({type:"POST",url:f,data:e,success:function(h){d.node.update_field_data(h);d._errors(h&&h.tool_model);d.deferred.done(g);console.debug("tools-form::_refreshForm() - States refreshed.");console.debug(h)},error:function(h){d.deferred.done(g);console.debug("tools-form::_refreshForm() - Refresh request failed.");console.debug(h)}})}});return{View:c}});