# Instituto Maré Azul

Site institucional da ONG fictícia Instituto Maré Azul, dedicada à limpeza de praias e rios e à capacitação de comunidades costeiras.

## 🚀 Stack

- HTML5 semântico
- CSS3 com Custom Properties e design system próprio
- TypeScript estrito compilado via `tsc`
- ES Modules nativos, sem bundler

## 📁 Estrutura

```text
ong-esperanca/
├── index.html                  # Página inicial
├── projetos.html               # Projetos e filtros
├── cadastro.html               # Cadastro de voluntários
├── package.json                # Scripts e dependências
├── tsconfig.json               # Configuração do TypeScript
├── assets/
│   ├── css/
│   │   ├── reset.css           # Reset moderno
│   │   ├── base.css            # Tokens e estilos globais
│   │   ├── components.css      # Componentes e responsividade
│   │   └── form.css            # Formulários e cards de projetos
│   └── js/
│       ├── main.ts             # Contadores da home
│       ├── menu.ts             # Menu mobile
│       ├── projetos.ts         # Filtros de projetos
│       ├── masks.ts            # Máscaras de entrada
│       ├── validators.ts       # Validações
│       ├── form.ts             # Fluxo do cadastro
│       └── dist/               # JavaScript compilado e sourcemaps
└── node_modules/               # Dependências instaladas
```

## 🛠️ Como rodar localmente

1. `npm install`
2. `npx tsc --watch` para recompilar o TypeScript automaticamente
3. Abrir `index.html` com o Live Server do VS Code

## ✨ Funcionalidades

- Formulário com máscaras de CPF, telefone e CEP
- Validação real de CPF
- Preenchimento automático de endereço via ViaCEP
- Contador animado na home
- Filtro dinâmico de projetos
- Menu mobile responsivo
- Skip link para navegação por teclado
- Suporte a `prefers-color-scheme` e `prefers-reduced-motion`

## 📸 Preview

- Hero institucional com chamada para ação
- Cards de missão e indicadores de impacto
- Página de projetos com filtros por categoria
- Cadastro completo de voluntários

## 🤝 Como contribuir

- Crie uma branch seguindo o fluxo GitFlow antes de iniciar uma alteração.
- Use commits semânticos, como `feat:`, `fix:` e `docs:`.
- Consulte as issues abertas para encontrar tarefas e propor melhorias.

## 👤 Autor

Seu nome aqui
