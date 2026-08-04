type AssociationBrandProps = {
  compact?: boolean;
  className?: string;
};

const mark = `${import.meta.env.BASE_URL}assets/isotipo-accsht-original.png`;

export function AssociationBrand({ compact = false, className = "" }: AssociationBrandProps) {
  return (
    <span className={`association-brand${compact ? " association-brand--compact" : ""}${className ? ` ${className}` : ""}`}>
      <img src={mark} width="160" height="160" alt="" aria-hidden="true" />
      <span className="association-brand__type">
        {compact ? (
          <><strong>ACCSHT</strong><small>Tandil</small></>
        ) : (
          <><strong>Comunidad Sorda</strong><small>e Hipoacúsica Tandilense</small></>
        )}
      </span>
    </span>
  );
}
