import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Toast, { BaseToast } from 'react-native-toast-message';
import { wordPacks } from '../assets/wordPacks';
import useWords from '../hooks/useWords';

const PRIMARY = 'rgb(17, 82, 115)';

export default function WordPacksScreen() {
  const navigation = useNavigation();
  const { words, refresh, addWords } = useWords();
  const [selectedPack, setSelectedPack] = useState(null);

  useLayoutEffect(() => {
    refresh();
  }, [refresh]);

  const toastConfig = {
    customInfo: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: PRIMARY, backgroundColor: 'black' }}
        text1Style={{ color: 'white' }}
        text2Style={{ color: 'white' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      />
    ),
  };

  const existingSet = new Set(words.map((w) => w.en.trim().toLowerCase()));
  const isAdded = (pack) =>
    pack.words.every((w) => existingSet.has(w.en.trim().toLowerCase()));

  const handleAdd = async (pack) => {
    const added = await addWords(pack.words);
    Toast.show({
      type: 'customInfo',
      text1: added > 0 ? `${added} kelime eklendi` : 'Bu paket zaten ekli',
      visibilityTime: 2000,
      position: 'bottom',
    });
  };

  const backButtonHandler = () => {
    navigation.navigate('HomeScreen');
  };

  const renderAddButton = (pack, big) => {
    const added = isAdded(pack);
    return (
      <TouchableOpacity
        style={[styles.addButton, added && styles.addedButton, big && styles.addButtonBig]}
        onPress={() => handleAdd(pack)}
        disabled={added}
      >
        <AntDesign name={added ? 'check' : 'plus'} size={18} color="white" />
        <Text style={styles.addButtonText}>{added ? 'Eklendi' : 'Ekle'}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity style={styles.backButton} onPress={backButtonHandler}>
          <AntDesign name="left" size={22} color="white" />
          <Text style={styles.backButtonText}>Geri</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Word Packs</Text>
        <View style={styles.headSpacer} />
      </View>

      <FlatList
        data={wordPacks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.packCard}
            activeOpacity={0.7}
            onPress={() => setSelectedPack(item)}
          >
            <View style={styles.packInfo}>
              <Text style={styles.packName}>{item.name}</Text>
              <Text style={styles.packDesc}>{item.description}</Text>
              <Text style={styles.packCount}>{item.words.length} kelime · göster</Text>
            </View>
            {renderAddButton(item, false)}
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={selectedPack !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setSelectedPack(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle} numberOfLines={1}>
                {selectedPack?.name}
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedPack(null)}
              >
                <AntDesign name="close" size={22} color={PRIMARY} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.wordScroll} contentContainerStyle={styles.wordScrollContent}>
              {selectedPack?.words.map((w, i) => (
                <View key={i} style={styles.wordRow}>
                  <Text style={styles.wordEn}>{w.en}</Text>
                  <Text style={styles.wordTr}>{w.tr}</Text>
                </View>
              ))}
            </ScrollView>

            {selectedPack && (
              <View style={styles.modalFooter}>{renderAddButton(selectedPack, true)}</View>
            )}
          </View>
        </View>
      </Modal>

      <Toast config={toastConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingTop: '10%',
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
  },
  backButton: {
    backgroundColor: PRIMARY,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 2,
  },
  headerText: {
    color: PRIMARY,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  headSpacer: {
    width: 70,
  },
  list: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  packCard: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: PRIMARY,
    borderWidth: 3,
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    backgroundColor: 'white',
  },
  packInfo: {
    flex: 1,
    paddingRight: 10,
  },
  packName: {
    color: PRIMARY,
    fontSize: 18,
    fontWeight: '700',
  },
  packDesc: {
    color: '#5a7688',
    fontSize: 13,
    marginTop: 2,
  },
  packCount: {
    color: PRIMARY,
    fontSize: 13,
    fontWeight: '600',
    marginTop: 6,
  },
  addButton: {
    backgroundColor: PRIMARY,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 14,
    alignItems: 'center',
    flexDirection: 'row',
  },
  addButtonBig: {
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  addedButton: {
    backgroundColor: '#3a9d5d',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
    marginLeft: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    width: '88%',
    maxHeight: '75%',
    backgroundColor: 'white',
    borderRadius: 18,
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 18,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    flex: 1,
    color: PRIMARY,
    fontSize: 20,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  wordScroll: {
    flexGrow: 0,
  },
  wordScrollContent: {
    paddingBottom: 4,
  },
  wordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e3ebf0',
  },
  wordEn: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  wordTr: {
    color: '#5a7688',
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  modalFooter: {
    marginTop: 14,
    alignItems: 'center',
  },
});
