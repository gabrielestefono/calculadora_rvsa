import Head from "next/head";
import styles from "./index.module.scss";
import { MouseEvent, useState, useEffect } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  // Valor a ser mostrado na tela, enquanto o usuário digita
  const [valor, setValor] = useState<string>("0");
  // Valor a ser mostrado acima da tela, como um histórico até o usuário clicar em "="
  const [resultado, setResultado] = useState<string>("");
  // Valor sempre atualizado e resolvido, será mostrado na tela quando o usuário clicar em "="
  const [conta, setConta] = useState<number>(0);
  // Operador a ser utilizado na conta (usa-se o operador anterior quando o usuário clica em outro operador)
  const [operador, setOperador] = useState<string>("");

  /**
   * O useEffect, nesse caso só é responsável por verificar se o usuário já tinha escolhido o tema escuro
   */

  useEffect(() => {
    const darkModeStorage = localStorage.getItem("darkMode");
    setDarkMode(darkModeStorage === "true");
  }, []);
  
  /**
   * Função responsável por trocar o tema escuro e salvar no localStorage
   */
  function toggleDarkMode() {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  }

  /**
   * Mosta o valor do botão clicado na tela
   * @param event recebe o evento do clique do botão
   * @returns 
   */
  function mostrarValor(event: MouseEvent<HTMLButtonElement>){
    if(valor.includes(".") && event.currentTarget.innerText == "."){
      return;
    }
    if((!valor.includes(".") && valor.length == 8) || (valor.includes(".") && valor.length == 9)){
      return;
    }
    if(event.currentTarget.innerText.length == 1 && valor == "0"){
      setValor(event.currentTarget.innerText);
    }else{
      setValor(valor + event.currentTarget.innerText);
    }
  }

  /**
   * Define o operador da conta e já resolve a conta anterior
   * @param event recebe o evento do clique do botão
   */
  function definirOperador(event: MouseEvent<HTMLButtonElement>){
    if(resultado == ""){
      setResultado(valor + event.currentTarget.innerText);
    }else{
      setResultado(resultado + valor + event.currentTarget.innerText);
    }
    resolverConta(event.currentTarget.innerText);
  }

  /**
   * Resolve a conta anterior e já define o operador para a próxima conta
   * @param operadorAtual recebe o operador que será utilizado na conta
   */
  function resolverConta(operadorAtual: string){
    let resolucao:number = 0;
    switch(operador){
      case "":
        resolucao = parseFloat(valor);
        break;
      case "+":
        resolucao = conta + parseFloat(valor);
        break;
      case "-":
        resolucao = conta - parseFloat(valor);
        break;
      case "*":
        resolucao = conta * parseFloat(valor);
        break;
      case "/":
        resolucao = conta / parseFloat(valor);
        break;
    }
    if(operadorAtual != "="){
      setOperador(operadorAtual);
      setValor("0");
    }else{
      setValor(resolucao.toString());
      setOperador("");
      setConta(0);
      setResultado("");
    }
    setConta(resolucao);
  }

  /**
   * Limpa todos os valores da calculadora
   */
  function limparTudo(){
    setValor("0");
    setResultado("");
    setConta(0);
    setOperador("");
  }

  /**
   * Limpa o último dígito do valor
   */
  function limparUltimoDigito(){
    if(valor.length == 1){
      setValor("0");
    }else{
      setValor(valor.slice(0, -1));
    }
  }

  /**
   * Inverte o sinal do valor
   */
  function inverterSinal(){
    setValor((parseFloat(valor) * -1).toString());
  }

  /**
   * Renderiza o HTML da página
   */
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={darkMode ? styles.mainDark : styles.main}>
        <div>
          <div>
            <div>
              <button onClick={toggleDarkMode} className={darkMode ? styles.dark : styles.light}>
                <div></div>
              </button>
            </div>
            <div>
              <span>{resultado}</span>
            </div>
            <div>
              <span>{valor}</span>
            </div>
          </div>
          <div>
            <button onClick={limparTudo}>C</button>
            <button onClick={inverterSinal}>+/-</button>
            <button onClick={definirOperador}>%</button>
            <button onClick={definirOperador}>/</button>
            <button onClick={mostrarValor}>7</button>
            <button onClick={mostrarValor}>8</button>
            <button onClick={mostrarValor}>9</button>
            <button onClick={definirOperador}>*</button>
            <button onClick={mostrarValor}>4</button>
            <button onClick={mostrarValor}>5</button>
            <button onClick={mostrarValor}>6</button>
            <button onClick={definirOperador}>-</button>
            <button onClick={mostrarValor}>1</button>
            <button onClick={mostrarValor}>2</button>
            <button onClick={mostrarValor}>3</button>
            <button onClick={definirOperador}>+</button>
            <button onClick={mostrarValor}>.</button>
            <button onClick={mostrarValor}>0</button>
            <button onClick={limparUltimoDigito}>CE</button>
            <button onClick={definirOperador}>=</button>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </main>
    </>
  );
}
