import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';
(function(w,d,s,g,js,fjs){
  g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(cb){this.q.push(cb)}};
  js=d.createElement(s);fjs=d.getElementsByTagName(s)[0];
  js.src='https://apis.google.com/js/platform.js';
  fjs.parentNode.insertBefore(js,fjs);js.onload=function(){g.load('analytics')};
}(window,document,'script'));

  gapi.analytics.ready(function() {

 // Step 3: Authorize the user.

 var CLIENT_ID = '575207079397-uekn3i18hrkj94d78pldicst620e24v7.apps.googleusercontent.com';

 gapi.analytics.auth.authorize({
    container: 'auth-button',
    clientid: CLIENT_ID,
  });

 // Step 4: Create the view selector.

 var viewSelector = new gapi.analytics.ViewSelector({
    container: 'view-selector'
  });

 // Step 5: Create the timeline chart.

 var timeline1 = new gapi.analytics.googleCharts.DataChart({
    reportType: 'ga',
    query: {
      'dimensions': 'ga:date',
      'metrics': 'ga:sessions',
      'start-date': '7daysAgo',
      'end-date': 'yesterday',
    },
    chart: {
      type: 'LINE',
      container: 'timeline1'
    }
  });

 var timeline2 = new gapi.analytics.googleCharts.DataChart({
    reportType: 'ga',
    query: {
      'dimensions': 'ga:date',
      'metrics': 'ga:users',
      'start-date': '7daysAgo',
      'end-date': 'yesterday',
    },
    chart: {
      type: 'LINE',
      container: 'timeline2'
    }
  });

 // Step 6: Hook up the components to work together.

 gapi.analytics.auth.on('success', function(response) {
    viewSelector.execute();
  });

 viewSelector.on('change', function(ids) {
    var newIds = {
      query: {
        ids: ids
      }
    }
    timeline1.set(newIds).execute();
    timeline2.set(newIds).execute();
  });
});