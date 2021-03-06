var CSV_ENTRIES;

const renderEntries = () => {
  entries = $('#entries');

  for (var i in CSV_ENTRIES) {
    if (i == 5) {
      entries.append(
        '<div class="row"><center class="col-sm-6">' +
        '<div id="div-gpt-ad-1490568038751-4" style="height:250px; width:300px;">' +
        '</div>' +
        '</center><center class="col-sm-6">' +
        '<div id="div-gpt-ad-1490568038751-0" style="height:250px; width:300px;"></div>' +
        '</center></div><br>'
      );
    };

    var entry = CSV_ENTRIES[i];
    if (entry[0] !== "") {
      entries.append(
      '<div class="rectangle">' +
        '<div class="content">' +
          '<h1>' + entry[0] + '</h1>' +
          entry[1] +
        '</div>' +
      '</div>'+
      '<br>'
      );
    }
  }
}

$(document).ready(() => {
  $.get('./penndictentries.csv', data => {
    CSV_ENTRIES = $.csv.toArrays(data);
    renderEntries();
  });
});
