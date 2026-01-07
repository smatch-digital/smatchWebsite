import React from 'react'
import { EcosystemBlock } from '@/blocks/Ecosystem/Component'

export function Ecosystem() {
  return (
    <EcosystemBlock
      headline="Notre Écosystème"
      description="Un écosystème complet de solutions et de technologies pour accompagner nos clients dans toutes les étapes de leur digitalisation"
      connectivityTitle="Connectivité Universelle"
      connectivityDesc="Intégration native avec +100 ERPs. SAP, Oracle, Sage et solutions propriétaires."
      supportTitle="Support Ingénieur"
      supportDesc="Assistance technique dediée 24/7."
      apiTitle="API First"
      apiDesc="Documentation complete et SDKs modernes pour développeurs."
      optimizationTitle="Optimisation par l'IA"
      optimizationDesc="Anticipez vos besoins et optimisez vos flux grâce à l'analyse prédictive."
      controlTitle="Contrôle Total"
      controlDesc="Paramétrez vos flux logistiques via une interface intuitive sans code."
    />
  )
}
