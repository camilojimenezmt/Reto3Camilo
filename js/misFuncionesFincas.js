const baseUrl = "http://152.67.255.53:8080/api/"

function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url: baseUrl + "Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionFincas() {
    $.ajax({
        url: baseUrl + "Farm/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaFinca(response);
        }

    });

}

function pintarRespuestaFinca(response){

    let myTable="<table  border = 1>"
    myTable+="<tr>";
        myTable+="<th>Nombre</th>";
        myTable+="<th>Direccion</th>";
        myTable+="<th>Extension</th>";
        myTable+="<th>Descripcion</th>";
        myTable+="<th>Categoria</th>";
    "</tr>";

    for(i=0;i<response.length;i++){
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].address + "</td>";
        myTable+="<td>" + response[i].extension + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListafinca").html(myTable);
}


function agregarFinca() {
            let elemento = {
                name: $("#name2").val(),
                address: $("#address").val(),
                extension: $("#extension").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url: baseUrl + "Farm/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#address").val("");
                    $("#extension").val("");
                    $("#description2").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }  
