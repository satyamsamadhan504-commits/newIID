import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, fontStyles, radius, spacing} from '../../module/style-guide';

export type WorkshopSortKey =
  | 'price-asc'
  | 'price-desc'
  | 'title-asc'
  | 'title-desc';

export type WorkshopMode = 'both' | 'online' | 'offline';

export type WorkshopFilterValues = {
  sortBy: WorkshopSortKey;
  mode: WorkshopMode;
  priceMin: number;
  priceMax: number;
};

export const WORKSHOP_PRICE_MIN = 0;
export const WORKSHOP_PRICE_MAX = 2000;

export const DEFAULT_WORKSHOP_FILTERS: WorkshopFilterValues = {
  sortBy: 'price-asc',
  mode: 'both',
  priceMin: WORKSHOP_PRICE_MIN,
  priceMax: WORKSHOP_PRICE_MAX,
};

const SORT_OPTIONS: {key: WorkshopSortKey; label: string}[] = [
  {key: 'price-asc', label: 'Price (Lowest)'},
  {key: 'price-desc', label: 'Price (Highest)'},
  {key: 'title-asc', label: 'Title (A-Z)'},
  {key: 'title-desc', label: 'Title (Z-A)'},
];

const MODE_OPTIONS: {key: WorkshopMode; label: string}[] = [
  {key: 'both', label: 'Both'},
  {key: 'online', label: 'Online'},
  {key: 'offline', label: 'Offline'},
];

const THUMB = 22;
const TRACK_H = 4;

type Props = {
  visible: boolean;
  initialValues: WorkshopFilterValues;
  onClose: () => void;
  onReset: () => void;
  onConfirm: (values: WorkshopFilterValues) => void;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function snapPrice(value: number) {
  return Math.round(value / 50) * 50;
}

function formatPrice(value: number) {
  if (value === WORKSHOP_PRICE_MAX) {
    return `₹${value.toFixed(2)}`;
  }
  return `₹${value}`;
}

function RangeSlider({
  min,
  max,
  low,
  high,
  onChange,
}: {
  min: number;
  max: number;
  low: number;
  high: number;
  onChange: (next: {low: number; high: number}) => void;
}) {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackWidthRef = useRef(0);
  const valuesRef = useRef({low, high});
  const activeThumb = useRef<'low' | 'high' | null>(null);

  valuesRef.current = {low, high};

  function valueToX(value: number) {
    if (trackWidthRef.current <= 0) {
      return 0;
    }
    return ((value - min) / (max - min)) * trackWidthRef.current;
  }

  function xToValue(x: number) {
    if (trackWidthRef.current <= 0) {
      return min;
    }
    const ratio = clamp(x / trackWidthRef.current, 0, 1);
    return snapPrice(min + ratio * (max - min));
  }

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: evt => {
          const x = evt.nativeEvent.locationX;
          const lowX = valueToX(valuesRef.current.low);
          const highX = valueToX(valuesRef.current.high);
          activeThumb.current =
            Math.abs(x - lowX) <= Math.abs(x - highX) ? 'low' : 'high';
        },
        onPanResponderMove: evt => {
          const next = xToValue(evt.nativeEvent.locationX);
          const current = valuesRef.current;
          if (activeThumb.current === 'low') {
            onChange({
              low: clamp(next, min, current.high),
              high: current.high,
            });
            return;
          }
          if (activeThumb.current === 'high') {
            onChange({
              low: current.low,
              high: clamp(next, current.low, max),
            });
          }
        },
        onPanResponderRelease: () => {
          activeThumb.current = null;
        },
        onPanResponderTerminate: () => {
          activeThumb.current = null;
        },
      }),
    [max, min, onChange],
  );

  function onLayout(e: LayoutChangeEvent) {
    const width = e.nativeEvent.layout.width;
    trackWidthRef.current = width;
    setTrackWidth(width);
  }

  const lowX = valueToX(low);
  const highX = valueToX(high);

  return (
    <View style={sliderStyles.wrap} onLayout={onLayout} {...panResponder.panHandlers}>
      <View style={sliderStyles.track} />
      {trackWidth > 0 ? (
        <View
          style={[
            sliderStyles.fill,
            {
              left: lowX,
              width: Math.max(0, highX - lowX),
            },
          ]}
        />
      ) : null}
      <View
        style={[
          sliderStyles.thumb,
          sliderStyles.thumbLow,
          {left: Math.max(0, lowX - THUMB / 2)},
        ]}
        pointerEvents="none"
      />
      <View
        style={[
          sliderStyles.thumb,
          sliderStyles.thumbHigh,
          {left: Math.max(0, highX - THUMB / 2)},
        ]}
        pointerEvents="none"
      />
    </View>
  );
}

export function WorkshopFilterModal({
  visible,
  initialValues,
  onClose,
  onReset,
  onConfirm,
}: Props) {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState<WorkshopFilterValues>(initialValues);
  const [sortOpen, setSortOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setDraft(initialValues);
      setSortOpen(false);
      setMounted(true);
      slideAnim.setValue(0);
      fadeAnim.setValue(0);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 180,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 260,
          useNativeDriver: true,
        }),
      ]).start();
      return;
    }

    if (!mounted) {
      return;
    }

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start(({finished}) => {
      if (finished) {
        setMounted(false);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to visibility changes
  }, [visible]);

  useEffect(() => {
    if (visible) {
      setDraft(initialValues);
    }
  }, [visible, initialValues]);

  const sortLabel =
    SORT_OPTIONS.find(item => item.key === draft.sortBy)?.label ??
    'Price (Lowest)';

  const sheetTranslateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [420, 0],
  });

  if (!mounted) {
    return null;
  }

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.root}>
        <Animated.View style={[styles.backdrop, {opacity: fadeAnim}]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>
        <Animated.View
          style={[
            styles.sheet,
            {
              paddingBottom: Math.max(insets.bottom, spacing.spacing_8),
              transform: [{translateY: sheetTranslateY}],
            },
          ]}>
          <View style={styles.handleWrap}>
            <View style={styles.handle} />
          </View>

          <View style={styles.header}>
            <Text style={styles.headerTitle}>Sort workshop/webinars by</Text>
            <Pressable
              onPress={onClose}
              style={styles.closeBtn}
              accessibilityRole="button"
              accessibilityLabel="Close filter">
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>

          <View style={styles.body}>
            <View>
              <Pressable
                style={styles.sortField}
                onPress={() => setSortOpen(open => !open)}
                accessibilityRole="button"
                accessibilityLabel={`Sort by ${sortLabel}`}>
                <View style={styles.sortCopy}>
                  <Text style={styles.sortLabel}>Sort by</Text>
                  <Text style={styles.sortValue}>{sortLabel}</Text>
                </View>
                <Text style={styles.sortChevron}>{sortOpen ? '▴' : '▾'}</Text>
              </Pressable>
              {sortOpen ? (
                <View style={styles.sortMenu}>
                  {SORT_OPTIONS.map(option => {
                    const selected = option.key === draft.sortBy;
                    return (
                      <Pressable
                        key={option.key}
                        style={styles.sortOption}
                        onPress={() => {
                          setDraft(prev => ({...prev, sortBy: option.key}));
                          setSortOpen(false);
                        }}
                        accessibilityRole="button"
                        accessibilityState={{selected}}>
                        <Text
                          style={[
                            styles.sortOptionText,
                            selected && styles.sortOptionTextSelected,
                          ]}>
                          {option.label}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              ) : null}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Modes</Text>
              <View style={styles.modesRow}>
                {MODE_OPTIONS.map(option => {
                  const selected = option.key === draft.mode;
                  return (
                    <Pressable
                      key={option.key}
                      style={[
                        styles.modeBtn,
                        selected && styles.modeBtnSelected,
                      ]}
                      onPress={() =>
                        setDraft(prev => ({...prev, mode: option.key}))
                      }
                      accessibilityRole="button"
                      accessibilityState={{selected}}>
                      <Text
                        style={[
                          styles.modeLabel,
                          selected && styles.modeLabelSelected,
                        ]}>
                        {option.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <Text style={styles.priceSelected}>
                ₹{draft.priceMin} - ₹{draft.priceMax}
              </Text>
              <RangeSlider
                min={WORKSHOP_PRICE_MIN}
                max={WORKSHOP_PRICE_MAX}
                low={draft.priceMin}
                high={draft.priceMax}
                onChange={({low, high}) =>
                  setDraft(prev => ({
                    ...prev,
                    priceMin: low,
                    priceMax: high,
                  }))
                }
              />
              <View style={styles.priceBounds}>
                <Text style={styles.priceBound}>
                  {formatPrice(WORKSHOP_PRICE_MIN)}
                </Text>
                <Text style={styles.priceBound}>
                  {formatPrice(WORKSHOP_PRICE_MAX)}
                </Text>
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable
                style={styles.resetBtn}
                onPress={() => {
                  setDraft(DEFAULT_WORKSHOP_FILTERS);
                  setSortOpen(false);
                  onReset();
                }}
                accessibilityRole="button"
                accessibilityLabel="Reset filters">
                <Text style={styles.resetText}>Reset</Text>
              </Pressable>
              <Pressable
                style={styles.confirmBtn}
                onPress={() => onConfirm(draft)}
                accessibilityRole="button"
                accessibilityLabel="Confirm filters">
                <Text style={styles.confirmText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const sliderStyles = StyleSheet.create({
  wrap: {
    height: 36,
    justifyContent: 'center',
    marginTop: spacing.spacing_4,
  },
  track: {
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    backgroundColor: colors.border,
  },
  fill: {
    position: 'absolute',
    height: TRACK_H,
    borderRadius: TRACK_H / 2,
    backgroundColor: colors.primary,
  },
  thumb: {
    position: 'absolute',
    top: (36 - THUMB) / 2,
    width: THUMB,
    height: THUMB,
    borderRadius: THUMB / 2,
  },
  thumbLow: {
    backgroundColor: colors.white,
    borderWidth: 1.5,
    borderColor: '#C5CDD6',
  },
  thumbHigh: {
    backgroundColor: colors.primary,
  },
});

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(26, 26, 26, 0.45)',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.radius_5,
    borderTopRightRadius: radius.radius_5,
    overflow: 'hidden',
    maxHeight: '92%',
  },
  handleWrap: {
    alignItems: 'center',
    paddingTop: spacing.spacing_4,
    paddingBottom: spacing.spacing_2,
    backgroundColor: '#F0F9FF',
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#C5CDD6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F0F9FF',
    paddingHorizontal: spacing.spacing_8,
    paddingBottom: spacing.spacing_7,
  },
  headerTitle: {
    ...fontStyles.body.medium.body_2,
    color: colors.text,
    flex: 1,
    paddingRight: spacing.spacing_4,
  },
  closeBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  body: {
    paddingHorizontal: spacing.spacing_8,
    paddingTop: spacing.spacing_8,
    paddingBottom: spacing.spacing_4,
    gap: spacing.spacing_8,
  },
  sortField: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.radius_3,
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortCopy: {
    flex: 1,
    gap: 2,
  },
  sortLabel: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 11,
  },
  sortValue: {
    ...fontStyles.body.medium.body_3,
    color: colors.text,
  },
  sortChevron: {
    color: colors.text_secondary,
    fontSize: 14,
  },
  sortMenu: {
    marginTop: spacing.spacing_3,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.radius_3,
    overflow: 'hidden',
  },
  sortOption: {
    paddingHorizontal: spacing.spacing_6,
    paddingVertical: spacing.spacing_5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  sortOptionText: {
    ...fontStyles.body.regular.body_3,
    color: colors.text,
  },
  sortOptionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  section: {
    gap: spacing.spacing_4,
  },
  sectionTitle: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
  },
  modesRow: {
    flexDirection: 'row',
    gap: spacing.spacing_4,
  },
  modeBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.radius_2,
    paddingVertical: spacing.spacing_5,
    alignItems: 'center',
  },
  modeBtnSelected: {
    borderColor: colors.primary,
  },
  modeLabel: {
    ...fontStyles.body.medium.body_3,
    color: colors.text,
  },
  modeLabelSelected: {
    color: colors.primary,
  },
  priceSelected: {
    ...fontStyles.body.bold.body_2,
    color: colors.text,
  },
  priceBounds: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.spacing_2,
  },
  priceBound: {
    ...fontStyles.body.regular.body_5,
    color: colors.text_secondary,
    fontSize: 11,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.spacing_5,
    marginTop: spacing.spacing_2,
  },
  resetBtn: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: radius.radius_3,
    paddingVertical: spacing.spacing_6,
    alignItems: 'center',
  },
  resetText: {
    ...fontStyles.body.medium.body_2,
    color: colors.primary,
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: radius.radius_3,
    paddingVertical: spacing.spacing_6,
    alignItems: 'center',
  },
  confirmText: {
    ...fontStyles.body.medium.body_2,
    color: colors.white,
  },
});
