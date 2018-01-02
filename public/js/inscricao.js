'use strict';
$(document).ready(function(){
	//mensagem de sucesso
	function msgSucesso(nome){			
		$('#apply-success').text('Inscrição bem sucedida! Bem vindo(a) '+nome ).fadeIn();
	}
	function msgError(errorStatus){
		$('#apply-error').text('Não conseguimos enviar a requisição para a Avanade Academy - Mensagem de erro => '+errorStatus ).fadeIn();
	}
	function clearForm(){
		$("#name, #email").each(function(){
			$(this).val('');
			$("#name").focus();
		});
	}
	//ao clicar no btn inscrever-se
	function enviaRequest(){
		const jform = $('#formInscricao');//recupera o formulário
		const form = jform.get()[0];

		//verifica se algum campo está vazio
		if(!form.checkValidity()){
			event.preventDefault();
			event.stopPropagation();
			
			//destacar o campo vazio
			if($("#name").val() == ''){
				$("#feedback-name").css("color","red");					
			}else{
				$("#feedback-name").css("color","green");
				$("#feedback-email").css("color","red");
			}
		}else{
			const nome = $('#name').val();//nome 
			//enviar dados para Avanade Academy
			$.ajax({
				method: 'POST',
				url: 'http://avanade.gama.academy/api/process_applications',
				dataType: 'json',
				headers: { EMAIL: 'rafaell-alves@outlook.com' }, // coloque seu email que usou para se inscrever aqui!
				contentType: 'application/json',
				data: JSON.stringify({ process_application: { name: nome , email: $('#email').val() } }),
				success: function(json) { 
					msgSucesso($('#name').val());//mostrar mensagem de sucesso
					clearForm();
					$("#fecharModal").click();
				},
				error: function(jqXHR, textStatus, errorThrown) {
					msgError(textStatus);//função que exibe a mensagem de erro
				}
			});		
			
		}
	}		
	$('#btn-apply').bind('click', function(){
		enviaRequest();
	});
});