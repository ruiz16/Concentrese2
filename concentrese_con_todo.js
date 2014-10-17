
window.onload = function()
{
	inicio();
}

function inicio()
{
	var txtFichas = []; // arreglo que contendrá las imagenes a usar
	var jugada = 1; // variable en la que va  apermitir contar la jugada que se realiza en cada turno
	var campo1;
	var campo2;
	var prueba = 0;
	var aciertos = 0;
	var segundos = 0;
	var minutos = 0;
	var ContarTiempoTotal = setInterval(function(){contartiempo()},1000);//llama a la funcion contartiempo cada segundo
	var TiempoTotal = "";


	function contartiempo()
	{
		segundos++;
		TiempoTotal = nom_div("Tiempo").innerHTML = minutos + " Minuto(s) " + segundos + " Segundo(s)";
		if(segundos == 59)
		{
			minutos++;
			segundos = 0;
		}
	}
	
	
	var creaEscenario = function()
	{
		var txt = "<table border = '0.5' solid black>";
		var divTabla = "";
		for(var i = 1; i <= 4; i++)
		{
			txt += "<tr>";
			for(var c = 1; c <= 5; c++)
			{
				if(i == 1)
				{
					divTabla = c + "a";
					txt += "<td><img src = 'Images/back.jpg'  id = '"+(divTabla)+"'/></td>";
				}
				if(i == 2)
				{
					divTabla = c + 5 + "a";
					txt += "<td><img src = 'Images/back.jpg'  id = '"+(divTabla)+"'/></td>";
				}
				if(i == 3)
				{
					divTabla = c + 10 + "a";
					txt += "<td><img src = 'Images/back.jpg'  id = '"+(divTabla)+"'/></td>";
				}
				if(i == 4)
				{
					divTabla = c + 15 + "a";
					txt += "<td><img src = 'Images/back.jpg'  id = '"+(divTabla)+"'/></td>";
				}
			}
			txt += "</tr>";
		}
		txt += "</table>";
		return txt;
	}
	nom_div("escenario").innerHTML = creaEscenario();
	jugar();

	
	function limpiaEscenario()
	{
		for(i=1;i<21;i++)
		{
			nom_div(i+"a").src = "Images/back.jpg";
		}		
	}

	function jugar()
	{
		var i = 0;
		var datos = "";

	// Los dos ciclos siguientes cargan las imagenes
		for(i=0;i<11;i++)
		{
			txtFichas[i] = i +".jpg";
		}

		var repetido=1;
		for(i=11;i<21;i++)
		{
			txtFichas[i] = repetido +".jpg";
			repetido++;
		}

		var aux="";
		// aca se va  a intercambiar
		for(i=1;i<21;i++)
		{
			var aleatorio = Math.round(Math.random()*19)+1;// multiplicamos por 19 ya que solo se necesitan 20 imagenes
			aux = txtFichas[i]; 
			txtFichas[i] = txtFichas[aleatorio]; 
			txtFichas[aleatorio] = aux;
		}

		for(i=1;i<21;i++)
		{
			nom_div(i+"a").src = "Images/"+txtFichas[i];
		}
		setTimeout(limpiaEscenario, 7000); // se hace un retardo de 7000 milisegundos (7 seg) y luego se llama a la funcion limpiaEscenario
	}

	// si turno es 1 hae la primera si es dos hace la segunda si desps del dos hay iguales hacer lo delso comen

	for(var i = 1; i <= 20; i++)
	{
			
		nom_div(i + "a").addEventListener('click', function(event)	
		{
			var posClick = event.target.id.split("a");
			if(jugada == 1)
			{
				jugada = 2;
				campo1 = posClick[0];
				nom_div(posClick[0]+"a").src = "Images/"+txtFichas[posClick[0]];
			}

			else
			{
				jugada = 1;
				campo2 = posClick[0];					
				nom_div(posClick[0]+"a").src = "Images/"+txtFichas[posClick[0]];
				setTimeout(Comparar,300);

				function Comparar()
				{

					if(txtFichas[campo1] == txtFichas[campo2])
					{
						aciertos++;// suma la cantidad de parejas encontradas
						console.log(aciertos);
						
						if(aciertos == 10)
						{
							clearInterval(ContarTiempoTotal);//detiene el contador setinterval
							alert("Has ganado el juego!!\nTiempo total: "+ TiempoTotal);//Tiempo total guarda el tiempo que contó el setinterval
							var Confirmar = confirm("¿Desea jugar de nuevo?");// por medio de un popup pregunta si desea volver a jugar
							if(Confirmar == true)
							{
								inicio();//inicia un nuevo juego
							}else
							{
								nom_div("escenario").innerHTML = "";//borra todo lo que esta en la división escenario
								nom_div("Terminar_Juego").innerHTML = "Gracias Por Jugar";//Imprime un mensaje indicando que acabo el juego								
							}

						}

					}else
					{
						nom_div(campo1+"a").src = "Images/back.jpg";
						nom_div(campo2+"a").src = "Images/back.jpg";
					}
				}				
			}
		});
		
	}
}


// funcion que permite capturar el id de un elemento de html
function nom_div(div)
{
	return document.getElementById(div);
}