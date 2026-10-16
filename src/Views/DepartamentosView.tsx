import { useState } from 'react';
import { FlatList, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DepartamentosViewModel } from '../ViewsModels/DepartamentosViewModel';
import { Departamento } from '../Models/Entities/Departamento';

export default function DepartamentosView() {
  const [viewModel] = useState(() => new DepartamentosViewModel());
  const departamentos = viewModel.listadoDep;
  const personas = viewModel.listadoPersonaPorDep;
  const hayDepartamentos = departamentos.length > 0;
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState(
    viewModel.depSeleccionado,
  );
  const [desplegableAbierto, setDesplegableAbierto] = useState(false);

  const seleccionarDepartamento = (departamento: Departamento) => {
    viewModel.depSeleccionado = departamento;
    setDepartamentoSeleccionado(departamento);
    setDesplegableAbierto(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>DIRECTORIO · ORGANIZACIÓN</Text>
          <Text style={styles.title}>Departamentos</Text>
          <Text style={styles.subtitle}>Consulta los equipos y sus integrantes.</Text>
        </View>

        <Text style={styles.sectionLabel}>DEPARTAMENTO</Text>
        <View
          style={[
            styles.departmentPickerContainer,
            desplegableAbierto && styles.departmentPickerContainerOpen,
          ]}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Seleccionar departamento"
            accessibilityState={{
              disabled: !hayDepartamentos,
              expanded: desplegableAbierto && hayDepartamentos,
            }}
            disabled={!hayDepartamentos}
            onPress={() => setDesplegableAbierto((abierto) => !abierto)}
            style={[
              styles.departmentPicker,
              !hayDepartamentos && styles.departmentPickerDisabled,
              desplegableAbierto && styles.departmentPickerOpen,
            ]}
          >
            <Text style={styles.departmentPickerText}>
              {departamentoSeleccionado?.nombre ??
                (hayDepartamentos ? 'Selecciona un departamento' : 'No hay departamentos disponibles')}
            </Text>
            {hayDepartamentos && (
              <Text style={styles.departmentPickerArrow}>{desplegableAbierto ? '⌃' : '⌄'}</Text>
            )}
          </Pressable>

          {desplegableAbierto && hayDepartamentos && (
            <View style={styles.departmentMenu}>
              {departamentos.map((departamento) => {
                const seleccionado = departamentoSeleccionado?.id === departamento.id;
                return (
                  <Pressable
                    key={departamento.id}
                    accessibilityRole="button"
                    accessibilityState={{ selected: seleccionado }}
                    onPress={() => seleccionarDepartamento(departamento)}
                    style={[styles.departmentOption, seleccionado && styles.departmentOptionSelected]}
                  >
                    <Text
                      style={[
                        styles.departmentOptionText,
                        seleccionado && styles.departmentOptionTextSelected,
                      ]}
                    >
                      {departamento.nombre}
                    </Text>
                    {seleccionado && <Text style={styles.departmentOptionCheck}>✓</Text>}
                  </Pressable>
                );
              })}
            </View>
          )}
        </View>

        <View style={styles.resultHeader}>
          <View>
            <Text style={styles.resultEyebrow}>
              {departamentoSeleccionado ? 'EQUIPO SELECCIONADO' : 'SIN DEPARTAMENTO'}
            </Text>
            <Text style={styles.resultTitle}>
              {departamentoSeleccionado?.nombre ?? 'Sin departamento'}
            </Text>
          </View>
          <View style={styles.countBadge}>
            <Text style={styles.countNumber}>{viewModel.numPersonasPorDep}</Text>
            <Text style={styles.countLabel}>
              {viewModel.numPersonasPorDep === 1 ? 'PERSONA' : 'PERSONAS'}
            </Text>
          </View>
        </View>

        <FlatList
          data={personas}
          keyExtractor={(persona) => String(persona.id)}
          showsVerticalScrollIndicator
          contentContainerStyle={styles.peopleList}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>
              {!hayDepartamentos
                ? 'Añade departamentos para poder consultar sus personas.'
                : departamentoSeleccionado
                  ? 'Este departamento todavía no tiene personas.'
                  : 'Selecciona un departamento para ver sus personas.'}
            </Text>
          }
          renderItem={({ item: persona, index }) => (
              <View key={persona.id} style={styles.personRow}>
                <View style={styles.personInitial}>
                  <Text style={styles.personInitialText}>{persona.nombre.charAt(0)}</Text>
                </View>
                <Text style={styles.personName}>{persona.nombre}</Text>
                <Text style={styles.personIndex}>{String(index + 1).padStart(2, '0')}</Text>
              </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F3',
  },
  content: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 28,
    paddingBottom: 12,
  },
  header: {
    marginTop: -28,
    marginHorizontal: -22,
    marginBottom: 28,
    paddingHorizontal: 22,
    paddingTop: 38,
    paddingBottom: 28,
    backgroundColor: '#173F3D',
    borderBottomWidth: 4,
    borderBottomColor: '#E37C5B',
  },
  eyebrow: {
    color: '#F3B28C',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.3,
  },
  title: {
    color: '#FBF5EB',
    fontSize: 34,
    fontWeight: '700',
    fontFamily: 'serif',
    marginTop: 10,
  },
  subtitle: {
    color: '#D5E6DC',
    fontSize: 15,
    marginTop: 6,
  },
  sectionLabel: {
    color: '#B85E42',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },
  departmentPickerContainer: {
    width: '84%',
    maxWidth: 390,
    alignSelf: 'flex-start',
    position: 'relative',
    marginBottom: 26,
    zIndex: 1,
  },
  departmentPickerContainerOpen: {
    zIndex: 20,
  },
  departmentPicker: {
    minHeight: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#9DBDB2',
    borderRadius: 7,
    borderWidth: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFFDF8',
  },
  departmentPickerOpen: {
    borderColor: '#D3684D',
  },
  departmentPickerDisabled: {
    backgroundColor: '#E9EDE9',
    borderColor: '#D6DEDA',
  },
  departmentPickerText: {
    color: '#214743',
    fontSize: 15,
    fontWeight: '700',
  },
  departmentPickerArrow: {
    color: '#D3684D',
    fontSize: 22,
    lineHeight: 24,
  },
  departmentMenu: {
    position: 'absolute',
    top: 58,
    left: 0,
    width: '100%',
    borderColor: '#9DBDB2',
    borderRadius: 7,
    borderWidth: 1,
    backgroundColor: '#FFFDF8',
    overflow: 'hidden',
    zIndex: 21,
    elevation: 8,
    shadowColor: '#173F3D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
  },
  departmentOption: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E7ECE9',
  },
  departmentOptionSelected: {
    backgroundColor: '#E4F0E9',
  },
  departmentOptionText: {
    color: '#34443F',
    fontSize: 14,
  },
  departmentOptionTextSelected: {
    color: '#175C53',
    fontWeight: '700',
  },
  departmentOptionCheck: {
    color: '#D3684D',
    fontSize: 16,
    fontWeight: '700',
  },
  resultHeader: {
    minHeight: 86,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#DCE3DF',
    borderBottomWidth: 1,
    borderBottomColor: '#DCE3DF',
    paddingVertical: 16,
    gap: 12,
  },
  resultEyebrow: {
    color: '#B85E42',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  resultTitle: {
    color: '#213D3A',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'serif',
    marginTop: 5,
  },
  countBadge: {
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
    backgroundColor: '#D3684D',
    paddingHorizontal: 11,
    paddingVertical: 8,
  },
  countNumber: {
    color: '#FFFFFF',
    fontSize: 21,
    fontWeight: '700',
  },
  countLabel: {
    color: '#FFF1E8',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.7,
    marginTop: 1,
  },
  peopleList: {
    flexGrow: 1,
    paddingTop: 4,
    paddingBottom: 24,
  },
  personRow: {
    minHeight: 67,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E7E3',
    gap: 13,
  },
  personInitial: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 19,
    backgroundColor: '#F0D1BC',
  },
  personInitialText: {
    color: '#75432F',
    fontSize: 15,
    fontWeight: '700',
  },
  personName: {
    flex: 1,
    color: '#263832',
    fontSize: 15,
    fontWeight: '600',
  },
  personIndex: {
    color: '#B85E42',
    fontSize: 12,
    fontVariant: ['tabular-nums'],
  },
  emptyMessage: {
    color: '#65736F',
    fontSize: 14,
    paddingVertical: 22,
  },
});