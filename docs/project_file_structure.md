# Estructura del Proyecto

├── .chatgpt/
│   ├── contexts/
│   │   ├── history/
│   │   │   ├── 2025-11-11_context_v1.md
│   │   │   ├── 2025-11-11_context_v2.md
│   │   │   └── _log.md
│   │   ├── context_backend.md
│   │   └── context_general.md
│   ├── templates/
│   │   ├── architecture_design.md
│   │   ├── bug_analysis.md
│   │   ├── context_template.md
│   │   ├── docstring_generator.md
│   │   ├── refactor_code.md
│   │   └── test_generator.md
│   └── launcher.sh
├── backend/
│   ├── core/
│   │   ├── config.py
│   │   └── model_manager.py
│   ├── ml_models/
│   │   ├── entity_extractor/
│   │   │   ├── dataset/
│   │   │   │   ├── context.txt
│   │   │   │   ├── full-dataset.jsonl
│   │   │   │   ├── train.jsonl
│   │   │   │   └── val.jsonl
│   │   │   ├── fine_tuned_model/
│   │   │   │   ├── checkpoint-4/
│   │   │   │   │   ├── config.json
│   │   │   │   │   ├── generation_config.json
│   │   │   │   │   ├── model.safetensors
│   │   │   │   │   ├── optimizer.pt
│   │   │   │   │   ├── rng_state.pth
│   │   │   │   │   ├── scheduler.pt
│   │   │   │   │   ├── special_tokens_map.json
│   │   │   │   │   ├── tokenizer.json
│   │   │   │   │   ├── tokenizer_config.json
│   │   │   │   │   ├── trainer_state.json
│   │   │   │   │   └── training_args.bin
│   │   │   │   ├── checkpoint-6/
│   │   │   │   │   ├── config.json
│   │   │   │   │   ├── generation_config.json
│   │   │   │   │   ├── model.safetensors
│   │   │   │   │   ├── optimizer.pt
│   │   │   │   │   ├── rng_state.pth
│   │   │   │   │   ├── scheduler.pt
│   │   │   │   │   ├── special_tokens_map.json
│   │   │   │   │   ├── tokenizer.json
│   │   │   │   │   ├── tokenizer_config.json
│   │   │   │   │   ├── trainer_state.json
│   │   │   │   │   └── training_args.bin
│   │   │   │   ├── config.json
│   │   │   │   ├── generation_config.json
│   │   │   │   ├── model.safetensors
│   │   │   │   ├── special_tokens_map.json
│   │   │   │   ├── tokenizer.json
│   │   │   │   └── tokenizer_config.json
│   │   │   ├── model.py
│   │   │   ├── prepare_dataset.py
│   │   │   └── train_llm_entity.py
│   │   └── relation_extractor/
│   │       ├── dataset/
│   │       │   └── context.txt
│   │       ├── model.py
│   │       └── train_llm_relation.py
│   ├── models/
│   │   ├── analysis_schemas.py
│   │   ├── blueprint_schemas.py
│   │   ├── request_schemas.py
│   │   └── response_schemas.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── blueprint.py
│   │   ├── full_blueprint.py
│   │   ├── structure.py
│   │   └── technologies.py
│   ├── services/
│   │   ├── ai_model.py
│   │   ├── blueprint_pipeline.py
│   │   ├── json_builder.py
│   │   ├── mermaid_generator.py
│   │   └── structure_builder.py
│   ├── utils/
│   │   └── helpers.py
│   ├── main.py
│   └── router.py
├── docs/
│   ├── BPMN_CU0001.md
│   ├── BPMN_CU0001.png
│   ├── BPMN_CU001.bpmn
│   ├── diseño.excalidraw
│   ├── diseño_frontend.png
│   ├── input-llm-example.json
│   └── project_file_structure.md
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   ├── blueprint/
│   │   │   │   ├── BaseBlueprintService.ts
│   │   │   │   ├── PremiumBlueprintService.ts
│   │   │   │   ├── StandardBlueprintService.ts
│   │   │   │   └── index.ts
│   │   │   └── api.ts
│   │   ├── assets/
│   │   │   ├── css/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── home.css
│   │   │   │   │   ├── premium-blueprint.css
│   │   │   │   │   └── standard-blueprint.css
│   │   │   │   ├── components.css
│   │   │   │   ├── globals.css
│   │   │   │   ├── layouts.css
│   │   │   │   └── reset.css
│   │   │   └── logo.svg
│   │   ├── components/
│   │   │   ├── StructureTree/
│   │   │   │   ├── StructureNode.tsx
│   │   │   │   ├── StructureTree.tsx
│   │   │   │   ├── index.ts
│   │   │   │   ├── structureTree.css
│   │   │   │   └── useStructureTree.tsx
│   │   │   ├── FullView.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── InputView.tsx
│   │   │   ├── Loading.tsx
│   │   │   └── OutputView.tsx
│   │   ├── context/
│   │   │   ├── UserContext.tsx
│   │   │   └── useUser.ts
│   │   ├── hooks/
│   │   │   ├── useMermaid.tsx
│   │   │   └── useTechnologies.tsx
│   │   ├── types/
│   │   │   ├── apiResponse.ts
│   │   │   └── structure.ts
│   │   ├── utils/
│   │   │   └── ViewManager.tsx
│   │   ├── views/
│   │   │   ├── ErrorView.tsx
│   │   │   ├── InitialView.tsx
│   │   │   └── ResultView.tsx
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── pnpm-workspace.yaml
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── scripts/
│   └── project_file_structure.py
├── .gitignore
├── LICENSE
├── README.md
├── notas.md
├── requirements-dev.txt
└── requirements.txt
