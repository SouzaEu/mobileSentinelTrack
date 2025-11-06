# 📱 Firebase App Distribution - SentinelTrack

## 🔧 Configuração no Firebase Console

### **1. Acesse o Firebase Console**
- URL: https://console.firebase.google.com
- Projeto: `lynex-2256a` (já configurado)

### **2. Habilitar App Distribution**
1. No menu lateral, clique em **"App Distribution"**
2. Se não estiver habilitado, clique **"Get started"**
3. Clique **"Get started"** novamente

### **3. Adicionar Testers**
1. Clique no botão **"Add testers"**
2. Adicione os emails:
   - Professor da FIAP
   - Membros da equipe (opcional)
3. Clique **"Save"**

### **4. Criar Grupo de Testers (Opcional)**
1. Clique em **"Groups"**
2. Clique **"Create group"**
3. Nome: `FIAP-Challenge-2025`
4. Adicione os testers ao grupo

## 📦 Upload do APK

### **Quando o EAS Build terminar:**

1. **Baixar o APK**
   - O EAS vai gerar um link de download
   - Baixe o arquivo `.apk`

2. **Upload no Firebase**
   - No Firebase Console > App Distribution
   - Clique **"Upload release"**
   - Selecione o arquivo APK baixado
   - Adicione release notes:
     ```
     SentinelTrack v1.0 - Challenge FIAP 2025
     
     ✅ Todas as funcionalidades implementadas
     ✅ Autenticação Firebase
     ✅ Notificações Push
     ✅ Internacionalização (PT/ES)
     ✅ Temas claro/escuro
     ✅ Integração com APIs Java/Python
     
     Instruções:
     1. Instale o APK
     2. Permita instalação de fontes desconhecidas
     3. Teste todas as funcionalidades
     ```

3. **Distribuir**
   - Selecione os testers ou grupos
   - Clique **"Distribute"**

## 📧 Resultado

Os testers receberão:
- **Email de convite** para testar
- **Link para download** do APK
- **Instruções** de instalação

## 🔗 Links Importantes

- **Firebase Console:** https://console.firebase.google.com/project/lynex-2256a
- **EAS Build Status:** https://expo.dev/accounts/souzaw/projects/sentineltrack-fiap/builds
- **Projeto GitHub:** https://github.com/SouzaEu/mobileSentinelTrack

## ✅ Checklist Final

- [ ] Firebase App Distribution habilitado
- [ ] Testers adicionados (professor FIAP)
- [ ] EAS Build concluído
- [ ] APK baixado
- [ ] APK enviado para Firebase
- [ ] Release notes adicionadas
- [ ] Distribuição realizada
- [ ] Email de convite enviado

---

**🎯 Objetivo:** Cumprir requisito de publicação (10 pontos) do Challenge 2025
