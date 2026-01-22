# Contribuindo para o gRPC Microservices Example

Obrigado por considerar contribuir para este projeto! 🎉

## 🤝 Como Contribuir

### Reportando Bugs

Se você encontrou um bug:

1. **Verifique** se o bug já não foi reportado nas [Issues](../../issues)
2. **Crie uma nova issue** incluindo:
   - Descrição clara do problema
   - Passos para reproduzir
   - Comportamento esperado vs. comportamento atual
   - Versão do Docker/Node/Python
   - Sistema operacional
   - Logs relevantes

### Sugerindo Melhorias

Para sugerir melhorias:

1. Verifique se já não existe uma issue similar
2. Crie uma nova issue descrevendo:
   - O problema que você quer resolver
   - Sua solução proposta
   - Benefícios da mudança
   - Possíveis impactos

### Pull Requests

1. **Fork** o repositório
2. **Clone** seu fork:

   ```bash
   git clone https://github.com/seu-usuario/gRPC-example.git
   cd gRPC-example
   ```

3. **Crie um branch** para sua feature:

   ```bash
   git checkout -b feature/minha-feature
   ```

4. **Faça suas alterações** seguindo os padrões do projeto

5. **Teste** suas alterações:

   ```bash
   docker-compose up --build
   ```

6. **Commit** suas mudanças:

   ```bash
   git add .
   git commit -m "feat: adiciona nova funcionalidade X"
   ```

7. **Push** para seu fork:

   ```bash
   git push origin feature/minha-feature
   ```

8. **Abra um Pull Request** explicando:
   - O que foi feito
   - Por que foi feito
   - Como testar

## 📝 Padrões de Código

### Python (User Service)

- Use PEP 8 para formatação
- Adicione docstrings em funções
- Use type hints quando apropriado
- Mantenha funções pequenas e focadas

```python
def create_user(request: CreateUserRequest) -> UserResponse:
    """
    Cria um novo usuário no sistema.

    Args:
        request: Dados do usuário a ser criado

    Returns:
        UserResponse com dados do usuário criado
    """
    # Implementação
```

### JavaScript/Node.js (Product Service & Frontend)

- Use ESLint para linting
- Prefira const/let ao invés de var
- Use arrow functions quando apropriado
- Adicione comentários em código complexo

```javascript
/**
 * Cria um novo produto
 * @param {Object} request - Dados do produto
 * @param {Function} callback - Callback com resposta
 */
const createProduct = (request, callback) => {
  // Implementação
};
```

### Protocol Buffers

- Use nomes claros e descritivos
- Documente mensagens complexas
- Mantenha compatibilidade com versões anteriores

```protobuf
// Representa um usuário no sistema
message User {
  string id = 1;           // ID único do usuário
  string name = 2;         // Nome completo
  string email = 3;        // Email (deve ser único)
  int64 created_at = 4;    // Timestamp de criação
}
```

## 🧪 Testes

Antes de submeter um PR:

1. **Teste manualmente** todas as funcionalidades afetadas
2. **Execute os scripts de teste**:

   ```bash
   # Windows
   .\test-services.ps1

   # Linux/Mac
   ./test-services.sh
   ```

3. **Verifique os logs** em busca de erros:
   ```bash
   docker-compose logs -f
   ```

## 📚 Documentação

Ao adicionar novas features:

1. **Atualize o README.md** se necessário
2. **Atualize DOCUMENTATION.md** com detalhes técnicos
3. **Adicione exemplos** em API_EXAMPLES.md
4. **Atualize comentários** no código

## 🎯 Áreas para Contribuir

### Features Desejadas

- [ ] Autenticação e autorização (JWT)
- [ ] Persistência com banco de dados (PostgreSQL/MongoDB)
- [ ] Testes unitários e de integração
- [ ] Cache com Redis
- [ ] Logging estruturado
- [ ] Métricas e observabilidade (Prometheus/Grafana)
- [ ] CI/CD pipeline
- [ ] Kubernetes deployment
- [ ] API Gateway
- [ ] Rate limiting
- [ ] Documentação OpenAPI/Swagger

### Melhorias

- [ ] Validação de entrada mais robusta
- [ ] Melhor tratamento de erros
- [ ] Internacionalização (i18n)
- [ ] Dark mode no frontend
- [ ] Paginação nas listagens
- [ ] Filtros e busca
- [ ] Upload de arquivos
- [ ] Exportação de dados (CSV, JSON)

## 🔄 Processo de Review

1. Um mantenedor irá revisar seu PR
2. Pode haver pedidos de alterações
3. Após aprovação, o PR será merged
4. Seu nome será adicionado aos contribuidores!

## 📜 Convenção de Commits

Use commits semânticos:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Mudanças na documentação
- `style:` - Formatação, ponto e vírgula, etc
- `refactor:` - Refatoração de código
- `test:` - Adição de testes
- `chore:` - Tarefas de manutenção

Exemplos:

```
feat: adiciona autenticação JWT
fix: corrige erro ao deletar usuário
docs: atualiza instruções de instalação
refactor: melhora estrutura do código do frontend
```

## ❓ Dúvidas?

- Abra uma [Discussion](../../discussions)
- Entre em contato via Issues
- Consulte a [documentação](./DOCUMENTATION.md)

## 🙏 Agradecimentos

Toda contribuição é valiosa e apreciada! Obrigado por ajudar a melhorar este projeto.

---

**Lembre-se:** Este é um projeto educacional. Seja gentil, respeitoso e colaborativo! 💙
