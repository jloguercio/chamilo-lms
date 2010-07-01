﻿if (typeof AMprocessNode!='function'){LoadScript(FCKConfig.ScriptASCIIMathML);};notifyIfNoMathML=false;translateASCIIMath=false;mathfontsize="1.1em";FCKCommands.RegisterCommand('asciimath',new FCKDialogCommand(FCKLang['DlgAsciiMath'],FCKLang['DlgAsciiMath'],FCKConfig.PluginsPath+'asciimath/fck_asciimath.html',800,620));var oAsciiMathItem=new FCKToolbarButton('asciimath',FCKLang['DlgAsciiMath']);oAsciiMathItem.IconPath=FCKConfig.PluginsPath+'asciimath/asciimath.gif';FCKToolbarItems.RegisterItem('asciimath',oAsciiMathItem);FCK.ContextMenu.RegisterListener({AddItems:function(A,B,C){if (FCKAsciiMath.FindFormulaContainer(B)){A.AddSeparator();A.AddItem('asciimath',FCKLang['DlgAsciiMath'],oAsciiMathItem.IconPath);}}});FCK.RegisterDoubleClickHandler(function (A){if (FCKAsciiMath.FindFormulaContainer(A)){FCKCommands.GetCommand('asciimath').Execute();}},null);var FCKAsciiMath={};FCKAsciiMath.GetSearchElementFromSelection=function(){var A=FCK.Selection.GetSelectedElement();if (!A){A=FCK.Selection.GetBoundaryParentElement(true);};return A;};FCKAsciiMath.IsFormula=function(A){if (A&&A.nodeName&&A.nodeName.IEquals('span')&&A.className&&A.className.indexOf('AM')!=-1){return true;};return false;};FCKAsciiMath.FindFormulaContainer=function(A){var B=A;while (B){if (!B.nodeName){continue;};if (B.nodeName.IEquals('body','table')){break;};if (FCKAsciiMath.IsFormula(B)){return B;};if (B.parentNode){B=B.parentNode;}else{break;}};return null;};FCKAsciiMath.IsParsed=function(A){return A.getElementsByTagName('math')[0]?true:false;};FCKAsciiMath.GetFormula=function(A){var B='';if (FCKAsciiMath.IsFormula(A)){if (FCKAsciiMath.IsParsed(A)){if (A.title){B=A.title;}}else{B=A.innerHTML;}};return B.replace(/`/g,'');};FCKAsciiMath.Delete=function(){var A=FCKAsciiMath.FindFormulaContainer(FCKAsciiMath.GetSearchElementFromSelection());if (A){FCK.Selection.SelectNode(A);}else{return;};if (FCKBrowserInfo.IsIE){var B=FCK.EditorDocument.createElement('span');B.innerHTML='&nbsp;';B=A.parentNode.insertBefore(B,A);FCK.Selection.SelectNode(B);};FCK.Selection.Delete();if (FCKBrowserInfo.IsIE){FCKUndo.SaveUndoStep();A.parentNode.removeChild(A);}};var FCKAsciiMathProcessor=FCKDocumentProcessor.AppendNew();FCKAsciiMathProcessor.ProcessDocument=function(A){var B=FCK.EditorDocument.getElementsByTagName('SPAN');var C;var i=B.length-1;while (i>=0&&(C=B[i--])){if (FCKAsciiMath.IsFormula(C)&&!FCKAsciiMath.IsParsed (C)){var D=C.cloneNode(true);D.title=C.innerHTML;AMprocessNode(D,false);D.setAttribute('_fckfakelement','true',0);D.setAttribute('_fckrealelement',FCKTempBin.AddElement(C),0);D.onresizestart=function(){FCK.EditorWindow.event.returnValue=false;return false;};C.parentNode.insertBefore(D,C);C.parentNode.removeChild(C);}}};FCKAsciiMath.SetListeners=function(){if (FCK.EditMode!=FCK_EDITMODE_WYSIWYG){return;};if (!FCKBrowserInfo.IsIE){FCK.EditorDocument.addEventListener('click',function(e){var A=FCKAsciiMath.FindFormulaContainer(e.target);if (A){FCKSelection.SelectNode(A);}},true);FCK.EditorDocument.addEventListener('keypress',function(e){var B=e.keyCode||e.which;switch (B){case 37:case 39:case 38:case 40:case 36:case 35:case 33:case 34:break;case 8:case 46:if (FCKAsciiMath.FindFormulaContainer(FCKAsciiMath.GetSearchElementFromSelection())){FCKAsciiMath.Delete();if (e.preventDefault) e.preventDefault();if (e.stopPropagation) e.stopPropagation();break;};default:if (FCKAsciiMath.FindFormulaContainer(FCKAsciiMath.GetSearchElementFromSelection())){if (e.preventDefault) e.preventDefault();if (e.stopPropagation) e.stopPropagation();};break;}},true);}else{FCKAsciiMath.KeyDownIE=function(e){if (!e) e=window.event;var B=e.keyCode;switch (B){case 8:case 46:if (FCKAsciiMath.FindFormulaContainer(FCKAsciiMath.GetSearchElementFromSelection())){FCKAsciiMath.Delete();e.cancelBubble=true;break;};default:break;}};FCKTools.AddEventListener(FCK.EditorDocument.body,'keydown',FCKAsciiMath.KeyDownIE);}};FCK.Events.AttachEvent('OnAfterSetHTML',FCKAsciiMath.SetListeners);FCK.UpdateLinkedField=function(){if (FCKConfig.FullPage){var A=FCK.EditorDocument.getElementsByTagName('html')[0];var B;if (typeof A=='object'){B=A.getElementsByTagName('HEAD')[0];};if (typeof B=='object'){var C=false;var D=FCK.EditorDocument.getElementsByTagName('SPAN');var E;var i=D.length-1;while (i>=0&&(E=D[i--])){if (FCKAsciiMath.IsFormula(E)){C=true;break;}};var F=false;var G=FCK.GetData(false);if (G){G=G.toString().match(/<head\s?[^>]*>(.*?)<\/head\s*>/i);if (G&&G.toString().indexOf('ASCIIMathML.js')!=-1){F=true;}};if (C&&!F){script=FCK.EditorDocument.createElement('script');script.setAttribute('src',FCKConfig.ScriptASCIIMathML);script.setAttribute('type','text/javascript');B.appendChild(script);}}};var H=FCK.GetData(FCKConfig.FormatOutput);if (FCKConfig.HtmlEncodeOutput) H=FCKTools.HTMLEncode(H);FCK.LinkedField.value=H;FCK.Events.FireEvent('OnAfterLinkedFieldUpdate');};
