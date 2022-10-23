$(function () {
    
    initDataTable = (tableName, columns, columnsDef) => {
        $(tableName).DataTable({
            "responsive": true, 
            "lengthChange": true, 
            "autoWidth": false,
            "columns": columns,
            "columnDefs": columnsDef
      }).buttons().container().appendTo(tableName+' .col-md-6:eq(0)');
    }

    initDataTable = (tableName, search, columns, columnsDef) => {
        $(tableName).DataTable({
            "responsive": true, 
            "lengthChange": true, 
            "autoWidth": false,
            "searching" : search,
            "columns": columns,
            "columnDefs": columnsDef
      }).buttons().container().appendTo(tableName+' .col-md-6:eq(0)');
    }

    renderData = (tableName, data) => {
        $(tableName).DataTable().clear().draw();
        $(tableName).DataTable().rows.add(data).draw();
    }

    ajaxCall = (url, method, enctype, data, fun) => {
        $.ajax({
            url: url,
            type: method,
            enctype : enctype,
            data: data,
            success: function (data) {
              if(data.code == 200){
                swal({
                    title: "Success!",
                    text: results.message,
                    icon: "success"
                }).then(function() {
                    if(fun != null){
                      fun;
                    }
                });
              }else if(data.code == 404){
                swal({
                  title: "Error!",
                  text: results.message,
                  icon: "error"
                }).then(function() {
                    
                });
              }
            }
          });
    }

    funCreate = (url, method, enctype, data, cb) => {
      $.ajax({
          url: url,
          type: method,
          enctype : enctype,
          data: data,
          success: function (data) {
            if(data.code == 200){
              cb(null, data.data);
            }else if(data.code == 404){
              cb(data.message, null);
            }
          }
        });
    }

    funDetails = (url, method, id, cb) => {
      $.ajax({
        url: url+id,
        type: method,
        success: function(data){
            if(data.code == 200){
              cb(null, data.data);
            }else if(data.code == 404){
              cb(data.message, null);
            }
        }
      });
    }

    funUpdate = (url, method, id, data, cb) => {
      $.ajax({
        url: url+id,
        type: method,
        data: data,
        success: function(data){
          if(data.code == 404){
            swal({
              title: "Sorry!",
              text: data.message,
              icon: "error"
            }).then(function() {   
              cb(data.message, null);
            });
          }else if(data.code == 200){
            swal({
              title: "Success!",
              text: data.message,
              icon: "success"
            }).then(function() {
              cb(null, data);
            });
          }
        }
      });
    }

    funDelete = (url, method, id) => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'ID '+id+' will delete!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if(result.isConfirmed){
          $.ajax({
            url: url+id,
            type: method,
            success: function(data){
              if(data.code == 200){
                Swal.fire(
                  'Deleted!',
                  data.message,
                  'success'
                );
              }else if(data.code == 404){
                Swal.fire(
                  'Sorry!',
                  data.message,
                  'error'
                );
              }
            }
          });
        }
      });
      
    }

});