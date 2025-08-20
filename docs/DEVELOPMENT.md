# Guia de Desenvolvimento

## Configuração do Ambiente

### Pré-requisitos
- Node.js 18+
- Expo CLI
- Android Studio ou Xcode
- Git

### Configuração Inicial

1. **Clone e instale dependências:**
\`\`\`bash
git clone <repo-url>
cd sentineltrack-mobile
npm install
\`\`\`

2. **Configure o ambiente:**
\`\`\`bash
cp .env.example .env
# Edite as variáveis conforme necessário
\`\`\`

3. **Execute o projeto:**
\`\`\`bash
npm start
\`\`\`

## Estrutura de Pastas

\`\`\`
src/
├── components/
│   ├── ui/              # Componentes base do sistema de design
│   └── ...              # Outros componentes reutilizáveis
├── contexts/
│   ├── AuthContext.tsx  # Contexto de autenticação
│   └── ThemeContext.tsx # Contexto de tema
├── hooks/
│   ├── useApi.ts        # Hook para requisições API
│   └── useAnimatedValue.ts # Hook para animações
├── navigation/
│   └── AppNavigator.tsx # Configuração de navegação
├── screens/
│   ├── auth/           # Telas de autenticação
│   └── main/           # Telas principais
├── services/
│   ├── api.ts          # Cliente HTTP base
│   ├── authService.ts  # Serviços de autenticação
│   └── motorcycleService.ts # Serviços de motos
└── utils/
    └── theme.ts        # Utilitários de tema
\`\`\`

## Padrões de Código

### TypeScript
- Use tipagem estrita
- Defina interfaces para todos os objetos
- Evite `any`, prefira `unknown`

\`\`\`typescript
// ✅ Bom
interface User {
  id: string;
  name: string;
  email: string;
}

// ❌ Evitar
const user: any = { ... };
\`\`\`

### Componentes React

\`\`\`typescript
// ✅ Estrutura recomendada
interface ComponentProps {
  title: string;
  onPress: () => void;
}

export function Component({ title, onPress }: ComponentProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}
\`\`\`

### Hooks Customizados

\`\`\`typescript
// ✅ Hook para API
export function useMotorcycles() {
  const { data, loading, error, execute } = useApi(
    () => motorcycleService.getMotorcycles()
  );
  
  return { motorcycles: data, loading, error, refetch: execute };
}
\`\`\`

### Serviços

\`\`\`typescript
// ✅ Estrutura de serviço
class MotorcycleService {
  async getMotorcycles(): Promise<Motorcycle[]> {
    const response = await apiClient.get<Motorcycle[]>('/motorcycles');
    return response.data;
  }
}

export const motorcycleService = new MotorcycleService();
\`\`\`

## Sistema de Temas

### Usando o Tema

\`\`\`typescript
import { useTheme } from '../contexts/ThemeContext';

export function Component() {
  const { colors, typography, spacing } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
      padding: spacing.md,
    },
    text: {
      color: colors.foreground,
      fontSize: typography.fontSizes.base,
    },
  });
  
  return <View style={styles.container}>...</View>;
}
\`\`\`

### Componentes UI

Use os componentes do sistema de design:

\`\`\`typescript
import { Button, Card, Input } from '../components/ui';

// ✅ Use componentes padronizados
<Card>
  <Input label="Email" />
  <Button title="Enviar" onPress={handleSubmit} />
</Card>
\`\`\`

## Navegação

### Estrutura
- **Tab Navigator**: Navegação principal (Home, Motos, Perfil)
- **Stack Navigator**: Navegação em pilha para cada seção
- **Auth Navigator**: Fluxo de autenticação

### Navegação entre Telas

\`\`\`typescript
// ✅ Navegação tipada
navigation.navigate('MotorcycleDetail', { motorcycleId: 'MT-001' });

// ✅ Parâmetros de rota
const { motorcycleId } = route.params;
\`\`\`

## Gerenciamento de Estado

### Context API
- **AuthContext**: Estado de autenticação
- **ThemeContext**: Preferências de tema

### Estado Local
- Use `useState` para estado de componente
- Use `useReducer` para estado complexo

## Requisições HTTP

### Usando o Hook useApi

\`\`\`typescript
// ✅ Para buscar dados
const { data, loading, error } = useApi(
  () => motorcycleService.getMotorcycles()
);

// ✅ Para mutações
const { mutate, loading } = useMutation(
  (data) => motorcycleService.createMotorcycle(data)
);
\`\`\`

### Tratamento de Erros

\`\`\`typescript
// ✅ Tratamento consistente
try {
  await motorcycleService.createMotorcycle(data);
  Alert.alert('Sucesso', 'Moto criada com sucesso');
} catch (error) {
  Alert.alert('Erro', error.message);
}
\`\`\`

## Testes

### Estrutura de Testes
\`\`\`bash
__tests__/
├── components/
├── services/
└── utils/
\`\`\`

### Executar Testes
\`\`\`bash
npm test
npm run test:watch
npm run test:coverage
\`\`\`

## Build e Deploy

### Build de Desenvolvimento
\`\`\`bash
expo build:android
expo build:ios
\`\`\`

### Build de Produção
\`\`\`bash
expo build:android --release-channel production
expo build:ios --release-channel production
\`\`\`

## Debugging

### Ferramentas
- **Flipper**: Debug avançado
- **React Native Debugger**: Debug do React
- **Expo DevTools**: Ferramentas do Expo

### Console Logs
\`\`\`typescript
// ✅ Use prefixo para identificar logs
console.log('[MotorcycleService] Fetching motorcycles...');
\`\`\`

## Performance

### Otimizações
- Use `React.memo` para componentes que não mudam frequentemente
- Implemente lazy loading para telas
- Use `FlatList` para listas grandes
- Otimize imagens com `expo-image`

### Monitoramento
- Use Flipper para monitorar performance
- Monitore uso de memória
- Teste em dispositivos reais

## Contribuição

1. Crie uma branch para sua feature
2. Siga os padrões de código
3. Adicione testes se necessário
4. Faça commit com mensagens descritivas
5. Abra um Pull Request

### Mensagens de Commit
\`\`\`
feat: adiciona tela de detalhes da moto
fix: corrige erro de navegação
docs: atualiza documentação da API
style: ajusta espaçamento dos botões
