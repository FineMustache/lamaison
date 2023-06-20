# LaMaison - Aplicativo de Realidade Aumentada

Bem-vindo ao repositório do aplicativo de Realidade Aumentada do projeto LaMaison! Este aplicativo permite visualizar objetos de decoração em Realidade Aumentada utilizando a biblioteca ViroReact.

## Pré-requisitos

Antes de iniciar, certifique-se de ter atendido aos seguintes requisitos:

- Android SDK versão 29 instalado em seu computador.
- Dispositivo móvel compatível com Realidade Aumentada. Verifique a disponibilidade do aplicativo "ARCore" na Play Store.
- Depuração USB habilitada nas configurações de desenvolvedor do dispositivo móvel.
- Acesso aos comandos "adb" para conectar o dispositivo móvel ao computador.

## Instalação e Execução

Siga as etapas abaixo para instalar e executar o aplicativo de Realidade Aumentada:

1. Navegue até a pasta "lamaison-mobile" no repositório e execute o comando a seguir para instalar as dependências do projeto:

```bash
npm install
```

2. Certifique-se de ter o Git LFS instalado para lidar com os arquivos grandes utilizados no projeto.

3. Conecte o dispositivo móvel ao computador via USB.

4. Habilite a Depuração USB nas configurações de desenvolvedor do dispositivo móvel.

5. Execute o seguinte comando para verificar se o dispositivo está pronto:

```bash
adb devices
```

   Certifique-se de que o dispositivo seja exibido como "device".

6. Agora você pode iniciar o aplicativo de Realidade Aumentada com o seguinte comando:

```bash
npx react-native run-android
```

   O aplicativo será instalado e executado no dispositivo conectado.

## Contribuição

Se você deseja contribuir para o desenvolvimento do aplicativo de Realidade Aumentada LaMaison, sinta-se à vontade para enviar pull requests ou relatar problemas nas [Issues](https://github.com/FineMustache/lamaison-mobile/issues).

## Licença

Este aplicativo está licenciado sob a [MIT License](https://github.com/FineMustache/lamaison-mobile/blob/main/LICENSE).
