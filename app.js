$(document).ready( function () {
    var data_url = 'https://jsonplaceholder.typicode.com/posts';

    var columns = [
        { "data": "userId" },
        { "data": "id" },
        { "data": "title" },
        { "data": "body" },
        { "data" : "userId",
          "render" : function (data, type, row){
            var row = '';
            row = '<span class="badge bg-warning">Active</span>';
            return row;
          }
        }
    ];

    $('#postsTable').DataTable({
        "responsive": true, 
        "lengthChange": true, 
        "autoWidth": false,
        "columns": columns
    });

    callData(data_url, (err, result) => {
        var data = result;
        $('#postsTable').DataTable().clear().draw();
        $('#postsTable').DataTable().rows.add(data).draw();
    });

});

function callData(url, cb){
    $.ajax({
        url: url,
        success: function (data) {
            cb(null, data);
        },
        error: function(err){
            cb(err, null);
        }
    });
}