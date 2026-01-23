"use client"

import "./pricing.css"

function CheckIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" />
            <path
                d="M8 12l3 3 5-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

function WarningIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="currentColor" fillOpacity="0.15" />
            <path
                d="M12 8v4m0 4h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

interface Feature {
    title: string
    description?: string
    type: "check" | "check-green" | "warning"
}

interface PricingCardProps {
    planName: string
    price: string
    period: string
    description: string
    features: Feature[]
    buttonText: string
    buttonStyle: "outline" | "filled"
    isRecommended?: boolean
    isPremium?: boolean
}

function PricingCard({
                         planName,
                         price,
                         period,
                         description,
                         features,
                         buttonText,
                         buttonStyle,
                         isRecommended,
                         isPremium,
                     }: PricingCardProps) {
    return (
        <div className={`pricing-card ${isPremium ? "premium" : ""}`}>
            {isRecommended && <div className="recommended-badge">Recommande</div>}

            <h2 className="plan-name">{planName}</h2>

            <div className="price-container">
                <span className={`price-amount ${isPremium ? "premium" : ""}`}>{price}</span>
                <span className={`price-currency ${isPremium ? "premium" : ""}`}>€</span>
                <span className="price-period">/ {period}</span>
            </div>

            <p className="plan-description">{description}</p>

            <ul className="features-list">
                {features.map((feature, index) => (
                    <li key={index} className="feature-item">
                        {feature.type === "warning" ? (
                            <WarningIcon className="feature-icon warning" />
                        ) : (
                            <CheckIcon className={`feature-icon ${feature.type}`} />
                        )}
                        <div className="feature-content">
                            <span className="feature-title">{feature.title}</span>
                            {feature.description && <span className="feature-description">{feature.description}</span>}
                        </div>
                    </li>
                ))}
            </ul>

            <button className={`pricing-button ${buttonStyle}`}>{buttonText}</button>
        </div>
    )
}

export default function Pricing() {
    const freemiumFeatures: Feature[] = [
        {
            title: "Analyse manuelle",
            description: "Copier-coller obligatoire dans l'app",
            type: "check",
        },
        {
            title: "Canal unique protege",
            description: "Moteurs de recherche uniquement",
            type: "check",
        },
        {
            title: "Limite mensuelle",
            description: "Nombre limite de liens analyses",
            type: "warning",
        },
        {
            title: "Module educatif",
            type: "check",
        },
    ]

    const premiumFeatures: Feature[] = [
        {
            title: "Interception automatique",
            description: "Analyse proactive avant ouverture",
            type: "check-green",
        },
        {
            title: "Canaux surveille configurable",
            description: "Messages, E-mails, Recherche, Reseaux sociaux",
            type: "check-green",
        },
        {
            title: "Analyse illimite",
            description: "Aucun quota de verification",
            type: "check-green",
        },
        {
            title: "Module educatif",
            type: "check-green",
        },
        {
            title: "Support prioritaire",
            type: "check-green",
        },
    ]

    return (
        <div className="pricing-container">
            <header className="pricing-header">
                <h1>Choisissez votre niveau de protection</h1>
                <p>
                    Que vous soyez utilisateur occasionnel ou que vous cherchiez une securite maximale, AegisScan a
                    l'offre qu'il vous faut.
                </p>
            </header>

            <div className="pricing-cards">
                <PricingCard
                    planName="Freemium"
                    price="0"
                    period="mois"
                    description="Pour une verification ponctuelle des liens suspects."
                    features={freemiumFeatures}
                    buttonText="Commencer gratuitement"
                    buttonStyle="outline"
                />

                <PricingCard
                    planName="Premium"
                    price="9.99"
                    period="mois"
                    description="Une protection complete et configurable pour tous vos canaux."
                    features={premiumFeatures}
                    buttonText="Passer au premium"
                    buttonStyle="filled"
                    isRecommended
                    isPremium
                />
            </div>
        </div>
    )
}
