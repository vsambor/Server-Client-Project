import csv,itertools
import json
import pandas as pd
from rdflib import Namespace, URIRef, Graph, Literal,XSD
from rdflib.namespace import RDF, FOAF
from faker import Faker
import sys


ns = Namespace("#")
g= Graph()


# Read and parse csv file


with open(sys.argv[1],encoding='mac_roman') as data:
    reader = itertools.islice(csv.DictReader(data, delimiter=';', quoting=csv.QUOTE_NONE),sys.argv[2])
    i=1
    for row in reader:
    	g.add( (URIRef(ns.a+str(i)), RDF.type , FOAF.accident) )
    	g.add( (URIRef(ns.a+str(i)), RDF.type , ns.collision+row["Type de Collision"]) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasOrganisme , ns.organisme+row["Organisme"]) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasLumiere , Literal(row["Lumiere"])) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasAgglomeration, ns.agglomeration+row["Agglomeration"]) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasIntersection , Literal(row["Intersection"])) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasConditionAtmospherique , Literal(row["Condition atmospherique"]) ))
    	g.add( (URIRef(ns.a+str(i)), FOAF.inDepartement , Literal(row["Departement"])) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasRoadCategorie , Literal(row["Categorie de route"])) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.inRegimeDeCirculation , ns.regimeCirculation+row["Regime de circulation"])) 
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasNbVoies , Literal(row["Nombre total de voies de circulation"])) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasProfilEnLong , ns.profil+row["Profil en long"])) 
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasTraceEnPlan , Literal(row["Trace en plan"])) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasSituation , ns.situation+row["Situation de laccident"])) 
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasNbPersTues , Literal(row["Nombre de personnes tues dans l'accident"],datatype=XSD.integer)) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasNbPersBlessesGraves , Literal(row["Nombre de blesses hospitalises (blesses graves) dans l'accident"],datatype=XSD.integer)) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasNbPersBlessesLegers , Literal(row["Nombre de blesses legers dans l'accident"],datatype=XSD.integer)) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasNbPersonnesIndemnes , Literal(row["Nombre de personnes indemnes dans l'accident"],datatype=XSD.integer)) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasIndiceDeGravite , Literal(row["Indice de gravite de l'accident"],datatype=XSD.double)) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasAdresse , Literal(row["Adresse"])) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasCodeInsee , Literal(row["Code Insee"])) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasNombreImpliques , Literal(row["Nombre impliques"],datatype=XSD.integer)) )
    	g.add( (URIRef(ns.a+str(i)), FOAF.hasCoordonnes , Literal(row["Coordonnees"])) )
    	i=i+1

g.serialize(destination='output.ttl', format='turtle')
