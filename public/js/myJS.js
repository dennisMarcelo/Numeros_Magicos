function callForm(number){
    let $registerForm = document.getElementById("registerForm")
    let inputNumer = ""

    for(let cont = 1; cont <= number; cont++){
       inputNumer += `<input  name="sequencia" type="number min="0" max="99"> ` 
    }

    $registerForm.innerHTML = ` <input type="hidden" name="tipoSequencia" value="${number}">

                                <label for="sequencia">sequencia</label>
                                ${inputNumer}
                                <br>

                                <label for="concurso">Concurso</label>
                                <input name="concurso" type="number" min="1" max="9999" required>
                                <br> 

                                <labl  for="dataDoConcurso">Data do Concurso</labl>
                                <input name="dataDoConcurso" type="date" required>
                                <br>

                                <button type="submit">Enviar Formulário</button>
                            `
}
