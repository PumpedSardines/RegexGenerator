# Regex Generator
This is a simple project to generate Regex strings. It takes a list of static strings and then generates a regex string that only matches those words.

## Examples
### Random strings
```
Input: 
"AGB", "AEB", "ADB", "AF", "ACB", "AB"

Output: 
A(F|(C|D|E|G)?B)
```
### Html Event names
```
Input:
"onabort", "onafterprint", "onanimationend", "onanimationiteration", "onanimationstart", "onbeforeprint", "onbeforeunload", "onblur", "oncanplay", "oncanplaythrough", "onchange", "onclick", "oncontextmenu", "oncopy", "oncut", "ondblclick", "ondrag", "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop", "ondurationchange", "onended", "onerror", "onfocus", "onfocusin", "onfocusout", "onfullscreenchange", "onfullscreenerror", "onhashchange", "oninput", "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata", "onloadedmetadata", "onloadstart", "onmessage", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseover", "onmouseout", "onmouseup", "onmousewheel", "onoffline", "ononline", "onopen", "onpagehide", "onpageshow", "onpaste", "onpause", "onplay", "onplaying", "onpopstate", "onprogress", "onratechange", "onresize", "onreset", "onscroll", "onsearch", "onseeked", "onseeking", "onselect", "onshow", "onstalled", "onstorage", "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "ontouchcancel", "ontouchend", "ontouchmove", "ontouchstart", "ontransitionend", "onunload", "onvolumechange", "onwaiting", "onwheel"

Output: 
on(animationiteration|c(anplay(through)?|lick|o(ntextmenu|py))|d(blclick|r(ag((ent|ov)er)?|op))|focus(in)?|key(press|up)|loaded(meta)?data|mouse(down|up|wheel|(ent|ov)er)|p(ageshow|lay(ing)?|rogress)|s(croll|e(arch|eking)|how)|touchcancel|(((before)?un)?loa|(s(eek|tall)|end)e|invali|(touch|drag|(anima|transi)tion|susp)en)d|(p(a(gehid|st|us)|opstat)|resiz|toggl|((stor|mess)a|((volum|rat)e|hash|(fullscree|duratio)n)?chan)g|o(ff|n)lin|timeupdat|((mouse|drag)lea|(mouse|touch)mo)v)e|waiting|wheel|(ope|keydow)n|((fullscreen)?erro|blu)r|(afterprin|s(elec|ubmi)|rese|beforeprin|(abo|(load|drag|touch|animation)sta)r|(c|(mouse|focus)o|inp)u)t)
```