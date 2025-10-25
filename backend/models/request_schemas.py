from pydantic import BaseModel, Field
from typing import List, Optional

class Specifications(BaseModel):
    arquitectura: Optional[List[str]] = Field(default_factory=list)
    base_de_datos: Optional[List[str]] = Field(default_factory=list)
    dominio: Optional[List[str]] = Field(default_factory=list)
    entorno_de_desarrollo: Optional[List[str]] = Field(default_factory=list)
    estilo_de_comunicacion: Optional[List[str]] = Field(default_factory=list)
    frameworks: Optional[List[str]] = Field(default_factory=list)
    integracion_continua: Optional[List[str]] = Field(default_factory=list)
    lenguaje: Optional[List[str]] = Field(default_factory=list)
    nivel_detalle: Optional[List[str]] = Field(default_factory=list)
    nube: Optional[List[str]] = Field(default_factory=list)
    patrones_de_diseno: Optional[List[str]] = Field(default_factory=list)
    principios: Optional[List[str]] = Field(default_factory=list)
    seguridad: Optional[List[str]] = Field(default_factory=list)
    tecnologias: Optional[List[str]] = Field(default_factory=list)
    testing: Optional[List[str]] = Field(default_factory=list)
    tipo_de_aplicacion: Optional[List[str]] = Field(default_factory=list)


class BlueprintRequest(BaseModel):
    descripcion: str
specifications: Optional[Specifications] = None
