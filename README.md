# LaMaison

Bem-vindo ao repositório do projeto LaMaison! Este é um sistema de loja virtual de objetos de decoração com recursos de realidade aumentada.

## Instalação e Configuração

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Clonar o Repositório

```bash
git clone https://github.com/FineMustache/lamaison.git
cd lamaison
```

### Configurar o Back-End

1. Navegue até a pasta "back" e execute o comando abaixo para instalar as dependências do Back-End:

```bash
npm install
```

2. O Back-End está hospedado no Glitch para acesso remoto, mas se você deseja executá-lo localmente, será necessário editar as partes do código que utilizam as credenciais do arquivo .env.

### Executar o Front-End

O Front-End não requer alterações para funcionar, pois se comunica diretamente com o Back-End hospedado no Glitch.

### Aplicativo do Catálogo

1. Navegue até a pasta "lamaison-cat" e execute o comando abaixo para instalar as dependências do projeto:

```bash
npm install
```

2. Agora você pode executar o aplicativo do catálogo utilizando o Expo.

```bash
npx expo start
```

### Aplicativo de Realidade Aumentada

1. Navegue até a pasta "lamaison-mobile" e execute o comando abaixo para instalar as dependências do projeto:

```bash
npm install
```

2. Certifique-se de ter o Git LFS instalado para lidar com os arquivos grandes utilizados no projeto.

3. Verifique se você possui o Android SDK versão 29 instalado em seu computador.

4. Certifique-se de que o dispositivo móvel que você irá utilizar é compatível com a Realidade Aumentada. Pesquise por "ARCore" na Play Store e verifique se a opção de instalação do aplicativo é exibida.

5. Habilite a Depuração USB nas configurações de desenvolvedor do seu dispositivo móvel.

6. Conecte o dispositivo móvel ao computador via USB e execute o seguinte comando para verificar se o dispositivo está pronto:

```bash
adb devices
```

Certifique-se de que o dispositivo seja exibido como "device".

7. Agora você pode iniciar o aplicativo de Realidade Aumentada com o comando abaixo:

```bash
npx react-native run-android
```

O aplicativo será instalado e executado no dispositivo conectado.

## Contribuição

Se você deseja contribuir para o desenvolvimento do projeto LaMaison, sinta-se à vontade para enviar pull requests ou relatar problemas nas [Issues](https://github.com/FineMustache/lamaison/issues).

## Licença

Este projeto está licenciado sob a [MIT License](https://github.com/FineMustache/lamaison/blob/main/LICENSE).

