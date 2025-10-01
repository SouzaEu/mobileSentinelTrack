# 🚀 Teste Rápido - Backend + Frontend

## ⚡ **Passos para Testar AGORA:**

### **1. Iniciar Backend Java**
```bash
cd backend
mvn spring-boot:run
# OU execute: run.bat
```

### **2. Verificar se Backend está funcionando**
- Acesse: http://localhost:8080/api/v1/actuator/health
- Deve retornar: `{"status":"UP"}`

### **3. Configurar Frontend (JÁ FEITO)**
✅ `.env` já configurado para usar backend local:
```env
EXPO_PUBLIC_USE_MOCKS=false
EXPO_PUBLIC_API_BASE_URL=http://localhost:8080/api/v1
```

### **4. Iniciar Frontend**
```bash
# No diretório mobileSentinelTrack
npm run web
# OU
npx expo start
```

### **5. Testar Login**
- **Email**: `admin@test.com`
- **Senha**: `123456`

## 🔧 **Se der erro:**

### **Backend não inicia:**
- Verifique se tem Java 17+ instalado: `java -version`
- Verifique se tem Maven: `mvn -version`

### **Frontend crasha:**
- Pare o servidor: `Ctrl+C`
- Limpe cache: `npx expo start --clear`
- Reinstale dependências: `npm install`

### **Erro de CORS:**
- Backend já está configurado para aceitar `localhost:3000` e `localhost:19006`
- Se ainda der erro, reinicie o backend

## 📱 **URLs de Teste:**

### **Backend:**
- **API Base**: http://localhost:8080/api/v1
- **Swagger**: http://localhost:8080/api/v1/swagger-ui.html
- **Health**: http://localhost:8080/api/v1/actuator/health

### **Frontend:**
- **Web**: http://localhost:3000 (Next.js)
- **Expo**: http://localhost:19006 (Expo Web)

## 🎯 **Teste Manual da API:**

### **1. Login (via curl ou Postman):**
```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.com","password":"123456"}'
```

### **2. Listar Motos (com token):**
```bash
curl -X GET http://localhost:8080/api/v1/motorcycles \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 🚨 **Problemas Comuns:**

1. **"MOCKS ainda ativados"** → Verifique `.env` e reinicie o app
2. **"Erro de conexão"** → Backend não está rodando na porta 8080
3. **"CORS error"** → Reinicie o backend
4. **"App crasha"** → Limpe cache com `--clear`

## ✅ **Sucesso quando:**
- Login funciona com credenciais de teste
- Lista de motos aparece (3 motos de exemplo)
- Alertas aparecem (3 alertas de exemplo)
- Não há mais mocks sendo usados
