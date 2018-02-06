from rdflib import Namespace, URIRef, Graph, Literal,XSD
from rdflib.namespace import RDF, FOAF
import json

ns = Namespace("#")
skos = Namespace('http://www.w3.org/2004/02/skos/core#')
graph = Graph()
graph.bind('skos', skos)


data = json.load(open('correspondence.json'))

#organisme concept
for i in range(1,len(data['org'])):
	graph.add((URIRef(ns.organisme+str(i)), RDF['type'], skos['Concept']))
	graph.add((URIRef(ns.organisme+str(i)), skos['prefLabel'], Literal( data['org'][i] ,lang='fr')))

#agglomeration concept
for i in range(1,len(data['agg'])):
	graph.add((URIRef(ns.agglomeration+str(i)), RDF['type'], skos['Concept']))
	graph.add((URIRef(ns.agglomeration+str(i)), skos['prefLabel'], Literal( data['agg'][i] ,lang='fr')))

#collision concept
for i in range(1,len(data['col'])):
	graph.add((URIRef(ns.collision+str(i)), RDF['type'], skos['Concept']))
	graph.add((URIRef(ns.collision+str(i)), skos['prefLabel'], Literal( data['col'][i] ,lang='fr')))

#regimeCirculation concept
for i in range(1,len(data['circ'])):
	graph.add((URIRef(ns.regimeCirculation+str(i)), RDF['type'], skos['Concept']))
	graph.add((URIRef(ns.regimeCirculation+str(i)), skos['prefLabel'], Literal( data['circ'][i] ,lang='fr')))

#profil concept
for i in range(1,len(data['prof'])):
	graph.add((URIRef(ns.profil+str(i)), RDF['type'], skos['Concept']))
	graph.add((URIRef(ns.profil+str(i)), skos['prefLabel'], Literal( data['prof'][i] ,lang='fr')))


#situation concept
for i in range(1,len(data['situ'])):
	graph.add((URIRef(ns.situation+str(i)), RDF['type'], skos['Concept']))
	graph.add((URIRef(ns.situation+str(i)), skos['prefLabel'], Literal( data['situ'][i] ,lang='fr')))


graph.serialize(destination='../../data/VOCAB/skos.ttl',format='turtle')
