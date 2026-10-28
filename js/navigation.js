const links=[["Inicio","index.html"],["Knowledge","pages/knowledge.html"],["Automation","pages/automation.html"],["Intelligency","pages/intelligency.html"],["AI Lab","pages/ai-lab.html"],["Formularios","pages/formularios.html"],["Tickets","pages/tickets.html"],["BI","pages/bi.html"],["Admin","admin/index.html"]];
const base=location.pathname.includes("/pages/")||location.pathname.includes("/admin/")?"../":"";
document.getElementById("site-header").innerHTML=`<div class="site-header"><nav class="nav"><a class="brand" href="${base}index.html"><span class="brand-mark">RIGO</span> FINANCE</a><div class="nav-links">${links.map(x=>`<a href="${base}${x[1]}">${x[0]}</a>`).join("")}</div></nav></div>`;
document.getElementById("site-footer").innerHTML=`<footer>Rigo Finance · V2 · ${new Date().getFullYear()}</footer>`;
/* ===== Profesor Alberto / Nova IA: se carga en todas las páginas que usan navigation.js ===== */
(function(){
  if(window.ProfesorAlberto){return;}
  var s=document.createElement("script");
  s.src=base+"js/profesor-alberto.js";
  s.onload=function(){
    window.ProfesorAlberto.init({
      idioma:"es",
      enlaces:links.map(function(x){
        return {nombre:x[0],url:new URL(base+x[1],location.href).href};
      })
    });
  };
  document.body.appendChild(s);
})();
