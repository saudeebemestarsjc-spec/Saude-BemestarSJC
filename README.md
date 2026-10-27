# Evento de Saúde & Bem-Estar — Landing page (edição de 31 de outubro)

Página estática em HTML, CSS e JavaScript puro, pronta para o **GitHub Pages**.
Sem build, sem backend, sem rastreadores.

## Estrutura

```
/
├── index.html
├── style.css
├── script.js
├── README.md
├── .nojekyll
└── assets/
    ├── images/
    │   ├── cartaz-evento.jpg            (1066 px)  cartaz oficial da nova edição
    │   ├── cartaz-evento-640.jpg        (640 px)   mesma arte, versão leve para celular
    │   ├── convidado-prof-mario.jpg     (450 px)   recorte da foto do Prof. Mário no cartaz
    │   ├── logo-transparente-160.png    logo (coroa de folhas) do cabeçalho e do rodapé
    │   └── og-image.jpg                 (1200×630) prévia no WhatsApp/redes
    └── icons/
        ├── favicon.png
        └── apple-touch-icon.png
```

Tudo foi gerado a partir da imagem oficial enviada e do logo do projeto. Os ícones e os ramos
de folhas são SVG desenhados dentro do próprio `index.html`.

> **Foto do Prof. Mário:** é um recorte do cartaz (450 px de largura), então não fica nítida em
> telas grandes. Se você tiver a foto original, salve como
> `assets/images/convidado-prof-mario.jpg` (de preferência com cerca de 900 px de largura) e ela
> substitui o recorte sem mexer em mais nada.

## Como atualizar informações

| O que mudar | Onde |
|---|---|
| Data, horário, local, endereço, Instagram, texto de compartilhamento | objeto `CONFIG` no topo do `script.js` |
| Textos das seções | `index.html` |
| Cores e fontes | variáveis no início do `style.css` (`:root`) |
| Título/descrição na busca e no WhatsApp | `<head>` do `index.html` |

> O texto de data/endereço também está escrito no HTML (reserva para buscadores e para quem abre
> sem JavaScript). Ao mudar a data, edite o `CONFIG` **e** procure por "31 de outubro", "31/10" e
> "16h30" no `index.html` (inclusive no `<head>`).

## Publicar no GitHub Pages

**Se já existe um repositório da edição anterior:** apague os arquivos antigos (ou substitua tudo)
e envie o conteúdo desta pasta. Os endereços do site continuam os mesmos.

**Se for um repositório novo:**
1. No github.com, clique em **New repository**, dê um nome (ex.: `evento-saude-bem-estar`), deixe **Public** e crie.
2. Clique em **uploading an existing file**, envie **todo o conteúdo desta pasta** (inclusive `assets` e `.nojekyll`) e clique em **Commit changes**.
3. Vá em **Settings → Pages**.
4. Em **Build and deployment → Source**, escolha **Deploy from a branch**.
5. Em **Branch**, selecione `main` e a pasta `/ (root)`, e clique em **Save**.
6. Aguarde 1 a 2 minutos. O endereço aparece no topo da tela de Pages: `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

Todos os caminhos são relativos, então funciona em endereço de repositório (com subpasta).

### Depois de publicar (importante para o WhatsApp)
O WhatsApp só mostra a prévia (imagem + título) se `og:image` tiver a **URL completa**. No `index.html`, troque:

```html
<meta property="og:image" content="assets/images/og-image.jpg">
<meta name="twitter:image" content="assets/images/og-image.jpg">
```
por
```html
<meta property="og:image" content="https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/assets/images/og-image.jpg">
<meta name="twitter:image" content="https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/assets/images/og-image.jpg">
```
Se quiser, adicione também `<meta property="og:url" content="https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/">`.
Para forçar o WhatsApp a atualizar uma prévia antiga, acrescente `?v=2` ao final do link ao compartilhar.

## O que funciona

- Menu mobile acessível (botão, `aria-expanded`, Esc fecha, fecha ao escolher um link).
- Navegação suave entre as seções; blocos aparecem com leve animação ao rolar (desligada para quem prefere menos movimento).
- **Como chegar / Abrir no Google Maps / Traçar rota / Abrir no Waze**: links de busca pelo endereço (sem coordenadas inventadas).
- **Copiar endereço** e **Compartilhar evento** (compartilhamento nativo do celular; se não houver, WhatsApp ou copiar o link).
- Cartaz ampliável ao clicar (Esc fecha, foco de teclado).
- Foco visível, "pular para o conteúdo", textos alternativos e contraste conferidos.

## Informações que ainda precisam de confirmação

1. **Ano do evento**: o site mostra apenas "31 de outubro", sem ano (não foi confirmado). Por isso também não há dados estruturados de evento para o Google.
2. **Dia da semana**: não foi informado, então não aparece.
3. **Horário de término** e **programação detalhada**: não informados; o site só diz "16h30".
4. **Formato da participação do Prof. Mário** (palestra, atividade prática etc.): a página diz apenas que ele é o convidado especial.
5. **Sorteio de brindes**: prêmios, regras e condições não informados; a página só diz que haverá sorteio e indica o Instagram/organização.
6. **Serviços de saúde da edição anterior** (aferição de pressão, glicose, IMC, palestra, coquetel): foram removidos porque não constam no novo cartaz. Se continuarem nesta edição, avise para incluir.
7. **Foto do Prof. Mário**: use a original, se tiver (ver acima), e confirme que ele autorizou o uso da imagem no site.
8. **Endereço no mapa**: confira se o link do Google Maps leva ao local certo.
9. Textos educativos de **exercício físico** e **hidratação**: são gerais e sem promessas médicas; vale a organização ou o Prof. Mário revisar.
10. Frase "Cuidado, prevenção e bem-estar para toda a família" no rodapé: mantida da edição anterior; confirme que continua adequada.

## Testes que rodei

Página aberta em 375 px e 1366 px sem rolagem horizontal e sem erros de JavaScript; menu, ampliação do cartaz, compartilhar/copiar link, copiar endereço e links de Instagram, Maps, rota e Waze funcionando; todos os arquivos referenciados existem.
As fontes (Playfair Display e Mulish) vêm do Google Fonts; sem internet entram fontes do sistema (testei neste modo).
