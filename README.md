# SBR Netflix Ending Fixer

Uma extensão de navegador (Manifest V3) desenvolvida para resolver o problema da troca de trilha sonora nas *endings* de *Steel Ball Run* (JoJo's Bizarre Adventure) na Netflix, substituindo-a por uma música personalizada e respeitando a cena pós-créditos.

## Como funciona?
1. **Detecção Inteligente:** A extensão identifica automaticamente quando você entra na temporada de *Steel Ball Run* na Netflix.
2. **Gatilho Preciso:** Monitora a interface da Netflix para detectar o exato momento em que os créditos começam (através do botão de pular créditos).
3. **Substituição de Áudio:** Muta o áudio original da plataforma e executa a sua música customizada.
4. **Pós-Créditos Garantidos:** A música toca pela duração exata da *ending* e, ao terminar, desmuta o player automaticamente para você assistir à cena final do episódio.

---

## Como Instalar e Configurar

### 1. Clonar o Repositório
Abra o seu terminal e clone o projeto para o seu computador:
```bash
git clone [https://github.com/Kauan-13/fix-sbr-netflix-ending.git](https://github.com/Kauan-13/fix-sbr-netflix-ending.git)
cd sbr-netflix-ending
```

### 2. Adicionar a Música Customizada
1. Escolha a música de sua preferência em formato .mp3.
1. Renomeie o arquivo para ending.mp3.
1. Cole o arquivo ending.mp3 diretamente na raiz da pasta do projeto.

> [!TIP] 
> Se quiser um ícone personalizado para a extensão, adicione uma imagem quadrada em PNG na raiz do projeto com o nome icon.png.

### 3. Carregar a Extensão no Google Chrome
1. Abra o navegador e acesse a página de extensões:
    - Chrome: chrome://extensions/
1. No canto superior direito, ative o Modo do desenvolvedor (Developer mode).
1. No canto superior esquerdo, clique no botão Carregar sem compactação (Load unpacked).
1. Selecione a pasta do projeto `fix-sbr-netflix-ending`.
1. Pronto! A extensão já estará ativa e pronta para uso na Netflix.

## ⚙️ Funcionalidades do Pop-up
Clicando no ícone da extensão na barra de ferramentas do navegador, você pode:
- Ativar / Desativar a extensão rapidamente através do checkbox.