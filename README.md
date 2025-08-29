# App de Eventos - React Native + Expo

Aplicativo mobile para listagem e inscrição em eventos, construído com React Native, Expo Router e Tailwind CSS (NativeWind).

## 🚀 Features

- **Listagem de eventos** com busca e filtros por categoria
- **Detalhes do evento** com informações completas
- **Sistema de inscrições** com área personalizada "Minhas Inscrições"
- **Navegação por abas** entre eventos e inscrições
- **Pull-to-refresh** na listagem
- **Estados de loading** e empty states

## 🏗️ Decisões Técnicas

### **Arquitetura**
- **Expo Router** para navegação com file-based routing
- **Context API** para gerenciamento de estado global dos eventos e inscrições
- **TypeScript** para type safety
- **Componentes funcionais** com React Hooks

### **Gerenciamento de Estado**
- **EventsContext**: Centraliza eventos, inscrições e operações
- **Estado local**: Usado para busca, filtros e UI states
- **Persistência**: Em memória (pode ser expandido para AsyncStorage)

### **UI/UX**
- **NativeWind (Tailwind CSS)** para styling consistente
- **Feedback visual** com loading states e alertas
- **Navegação intuitiva** com stack e tab navigation

### **Fluxo Principal**
1. Usuário visualiza lista de eventos
2. Pode buscar/filtrar eventos
3. Acessa detalhes e se inscreve
4. Visualiza inscrições na aba dedicada

## 🛠️ Tecnologias

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **Expo Router** - Navegação baseada em arquivos
- **TypeScript** - Type safety
- **NativeWind** - Tailwind CSS para React Native
- **Expo Vector Icons** - Ícones

## 🚀 Como usar

```sh
git clone <repo-url>

yarn install

npx expo run:android

yarn start
```
