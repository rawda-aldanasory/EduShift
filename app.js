(function(){
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('global-nav');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function(){
    var y = window.scrollY;
    if (nav) nav.classList.toggle('nav-hidden', y > 120 && y > lastY);
    lastY = y;
  }, {passive:true});

  var toggle = document.getElementById('navToggle');
  if(toggle){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    document.querySelectorAll('.mobile-menu a').forEach(function(link){link.addEventListener('click',function(){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');});});
  }

  var reveals = document.querySelectorAll('[data-reveal]');
  if(reduce){ reveals.forEach(function(el){el.classList.add('is-revealed');}); }
  else if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-revealed');io.unobserve(entry.target);}});},{threshold:.12});
    reveals.forEach(function(el,i){el.style.transitionDelay=(i%4)*55+'ms';io.observe(el);});
  }else{reveals.forEach(function(el){el.classList.add('is-revealed');});}

  var options = document.querySelectorAll('.decision-option');
  options.forEach(function(option){option.addEventListener('click',function(){options.forEach(function(item){item.classList.remove('is-selected');item.querySelector('i').textContent='＋';});option.classList.add('is-selected');option.querySelector('i').textContent='✓';});});

  var steps = document.querySelectorAll('.journey-step');
  var progress = document.getElementById('journeyProgress');
  if(steps.length && 'IntersectionObserver' in window){
    var stepObserver = new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){var active=Array.prototype.indexOf.call(steps,entry.target);steps.forEach(function(s){s.classList.remove('is-active');});entry.target.classList.add('is-active');if(progress) progress.style.width=((active+1)/steps.length*100)+'%';}});},{rootMargin:'0px -35% 0px -35%',threshold:.25});
    steps.forEach(function(step){stepObserver.observe(step);});
  }

  var tabs = document.querySelectorAll('.audience-tabs button');
  var panels = document.querySelectorAll('.audience-panel-inner');
  tabs.forEach(function(tab){tab.addEventListener('click',function(){var id=tab.getAttribute('data-segment');tabs.forEach(function(t){t.classList.remove('is-active');t.setAttribute('aria-selected','false');});panels.forEach(function(p){p.classList.remove('is-active');});tab.classList.add('is-active');tab.setAttribute('aria-selected','true');var panel=document.querySelector('[data-panel="'+id+'"]');if(panel) panel.classList.add('is-active');});});

  var form = document.getElementById('demoForm');
  var status = document.getElementById('formStatus');
  if(form){form.addEventListener('submit',function(e){e.preventDefault();var required=form.querySelectorAll('[required]');var valid=true;required.forEach(function(field){if(!field.value.trim()){valid=false;field.style.borderColor='#f4a64e';}});if(!valid){status.textContent='Please add your name, work email, and organization.';return;}status.textContent='Thanks — your working session request is ready for the EDUShiftAI team.';form.reset();});}
})();
