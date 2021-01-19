function callForm(number){
    let $registerForm = document.getElementById("registerForm")
    let inputNumer = ""

    for(let cont = 1; cont <= number; cont++){
       inputNumer += `<input  id="sequence${cont}" type="number"> ` 
    }

    $registerForm.innerHTML = ` <input id="typeSequence" type="hidden" value="${number}">

                                <label for="sequence">sequencia</label>
                                ${inputNumer}
                                <br>

                                <label for="concurso">Concurso</label>
                                <input id="concurso" type="number" required>
                                <br> 

                                <labl  for="dataDoConcurso">Data do Concurso</labl>
                                <input id="dataDoConcurso" type="date" required>
                                <br>

                                <button type="submit">Enviar Formulário</button>
                            `
}
